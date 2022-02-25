const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Return all bands the user is a member of.
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryString = `
    SELECT  "band"."id", "band"."band_profile_image_path", "band"."name", "user_band"."role" FROM "band"
    JOIN "user_band" ON "band"."id" = "user_band"."band_id"
    JOIN "user" ON "user_band"."user_id" = "user"."id"
    WHERE "user"."id" = $1 AND "band"."archived_at" is null;`

  pool.query(queryString, [userId])
    .then(response => {
      res.send(response.rows);
    })
    .catch(error => {
      console.warn('Error fetching bands for user:', error);
      res.sendStatus(500);
    })
});

//Get info for a specific band.
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

  const queryString = 'INSERT INTO "band" ("name") VALUES ($1) RETURNING "id";';
  pool.query(queryString, [band_name])
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
  const newUserId = req.body.user_id;
  const role = req.body.role; //TODO: Validate this is member or admin.
  const queryString = `
    INSERT INTO "user_band" ("user_id", "band_id", "role")
    VALUES ($1, $2, $3);`;
  pool.query(queryString, [newUserId ,bandId, role])
    .then(response => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.warn('Error adding band member:', error);
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
