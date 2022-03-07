const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { default: axios } = require('axios');

// Return all bands the user is a member of.
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryString = `
    SELECT 
  	  "band"."id", 
  	  "band"."name", 
  	  "band"."created_at",
  	  "band"."updated_at",
  	  "band"."band_profile_image_path",
  	  (SELECT "user_band"."role" FROM "user_band" WHERE "user_band"."user_id" = $1 AND "user_band"."band_id" = "band"."id") as "role",
  	  JSONB_AGG( 
  	  	JSONB_BUILD_OBJECT(
  	  		'username', "user"."username", 
  	  		'first_name', "user"."first_name", 
  	  		'last_name', "user"."last_name", 
  	  		'user_profile_image_path', "user"."user_profile_image_path",
  	  		'role', "user_band"."role"
  	  	)
  	  ) AS "members" 
    FROM "band"
    JOIN "user_band" ON "band"."id" = "user_band"."band_id"
    JOIN "user" ON "user_band"."user_id" = "user"."id"
    WHERE "band"."archived_at" IS NULL AND "band"."id" = ANY (SELECT "band_id" FROM "user_band" WHERE "user_band"."user_id" = $1) 
    GROUP BY "band"."id";`

  pool.query(queryString, [userId])
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.warn('Error fetching bands for user:', error);
      res.sendStatus(500);
    })
});

//Get info for a specific band. not needed?
router.get('/:bandId', rejectUnauthenticated, (req, res) => {
  const bandId = req.params.bandId;
  const queryString = `SELECT * FROM "band" WHERE "band"."id"=$1;`;

  pool.query(queryString, [bandId])
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.warn('Error fetching band details:', error);
      res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const band_name = req.body.band_name;
  const band_profile_image_path = req.body.band_profile_image_path;
  const queryString = `
    INSERT INTO "band" ("name", "band_profile_image_path", "created_at", "updated_at") 
    VALUES ($1, $2, NOW(), NOW()) 
    RETURNING "id";`;

  pool.query(queryString, [band_name, band_profile_image_path])
    .then(response => {
      res.status(201).send(response.rows[0]);
    })
    .catch(error => {
      console.warn('Error creating band:', error);
      res.sendStatus(500);
    });
});

// TODO: Use archived at instead of delete, update updated_at
router.delete('/:bandId', rejectUnauthenticated, (req, res) => {
  //TODO: check authz
  const bandId = req.params.bandId;
  const queryString = `
    UPDATE "band"
    SET "archived_at" = NOW(), "updated_at" = NOW()
    WHERE "band"."id" = $1;`;

  pool.query(queryString, [bandId])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.warn('Error deleting band:', error);
      res.sendStatus(500);
    })
})

///////////////////
// GETTING AND MANAGING BAND MEMBERS
///////////////////

// Return members for a band.
router.get('/member/:bandId', rejectUnauthenticated, (req, res) => {
  const bandId = req.params.bandId;
  const queryString = `
    SELECT "user"."id", "username", "first_name", "last_name", "user_profile_image_path", "user_band"."role" FROM "user"
    JOIN "user_band" ON "user"."id" = "user_band"."user_id"
    JOIN "band" ON "user_band"."band_id" = "band"."id"
    WHERE "band"."id" = $1;`;

  pool.query(queryString, [bandId])
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.warn('Error retrieving band members:', error);
      res.sendStatus(500);
    });
});

// Add a user to a band
// TODO: update updated_at
router.post('/member/:bandId', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id; // TODO: validate user has rights to add users
  const bandId = req.params.bandId;
  const newUsername = req.body.username;
  const role = req.body.role; //TODO: Validate this is member or admin.
  const addMemberQueryString = `
    INSERT INTO "user_band" ("user_id", "band_id", "role")
    VALUES ($1, $2, $3);`;
  const memberLookupQueryString = `
    SELECT * FROM "user" 
    WHERE "username" = $1;`;

  pool.query(memberLookupQueryString, [newUsername])
    .then(response => {
      if(response.rowCount === 0) {
        res.sendStatus(404);
        return;
      }
      const newUserId = response.rows[0].id;
      pool.query(addMemberQueryString, [newUserId ,bandId, role])
      .then(response => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.warn('Error adding band member:', error);
        res.sendStatus(500);
      })
    })
    .catch(error => {
      console.warn('Error finding user:', error);
      res.sendStatus(500);
    })
});

// Delete a user from a band.
// We actually delete from this table rather than just archive.
// Update updated_at?
router.delete('/member/:bandId', rejectUnauthenticated, (req, res) => {
  const requestingUser = req.user.id; //TODO: Verify access.
  const bandId = req.params.bandId;
  const userId = req.body.user_id;
  console.log(`deleting ${userId} from ${bandId}`);
  const queryString = `
    DELETE FROM "user_band"
    WHERE "user_id" = $1 AND "band_id" = $2;`;
  pool.query(queryString, [userId, bandId])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.warn('Error deleting band member:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
