const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET all songs user has access to
router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const queryString = `
    SELECT DISTINCT 
        "song"."id", 
        "song"."band_id", 
        "song"."name", 
        "song"."created_at", 
        "song"."updated_at", 
        "song"."archived_at", 
        "song"."description", 
        COALESCE(JSONB_AGG(DISTINCT "song_comment") filter (where "song_comment"."id" is not null), '[]') as "comment" 
    FROM "song"
    JOIN "user_band" ON "song"."band_id" = "user_band"."band_id"
    LEFT JOIN "song_comment" ON "song"."id" = "song_comment"."song_id"
    WHERE "user_band"."user_id" = $1 OR "song"."user_id" = $1
    GROUP BY "song"."id";`;
    
    pool.query(queryString, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error retrieving songs:', error);
            res.sendStatus(500);
        });
});

// GET specific song for id
router.get('/:songId', rejectUnauthenticated, (req, res) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const queryString = `
    SELECT 
        "song"."id", 
        "song"."band_id", 
        "song"."name", 
        "song"."created_at", 
        "song"."updated_at", 
        "song"."archived_at", 
        "song"."description" 
    FROM "song"
    JOIN "user_band" ON "song"."band_id" = "user_band"."band_id"
    WHERE "song"."id" = $1 AND ("user_band"."user_id" = $2 OR "song"."user_id" = $2);`;
    
    pool.query(queryString, [songId, userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('Error retrieving songs:', error);
            res.sendStatus(500);
        });
});

//
router.post('/', rejectUnauthenticated, (req, res) => {
    const songName = req.body.song_name;
    const songDescription = req.body.song_description;
    const bandId = req.body.band_id;
    const userId = req.user.id;
    const queryString = `
        INSERT INTO "song" ("name", "band_id", "user_id", "description")
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryString, [songName, bandId, userId, songDescription])
        .then(response => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('Error adding song:', error);
            res.sendStatus(500);
        })
});

// Update a song's name or description.
// Currently no option to update a band or user.
router.put('/:songId', rejectUnauthenticated, (req, res) => {
    const songName = req.body.song_name;
    const songDescription = req.body.song_description;
    const songId = req.params.songId;
    const userId = req.user.id;
    const queryString = `
        UPDATE "song" 
        SET "name" = $1, "description" = $2, "updated_at" = NOW()
        FROM "user_band"
        WHERE "song"."id" = $3 AND ("user_band"."user_id" = $4 OR "song"."user_id" = $4);`;

    pool.query(queryString, [songName, songDescription, songId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error updating song:', error);
            res.sendStatus(500);
        })
});

// archive a song, update updated_at
router.delete('/:songId', rejectUnauthenticated, (req, res) => {
    const songId = req.params.songId;
    const userId = req.user.id;
    const queryString = `
        UPDATE "song" 
        SET "archived_at" = NOW(), "updated_at" = NOW()
        FROM "user_band"
        WHERE "song"."id" = $1 AND ("user_band"."user_id" = $2 OR "song"."user_id" = $2);`;

    pool.query(queryString, [songId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error deleting song:', error);
            res.sendStatus(500);
        });
    });


///////////////////
// COMMENTS
///////////////////

router.get('/comment/:songId', rejectUnauthenticated, (req, res) => {
    const songId = req.params.songId;
    const queryString = `
        SELECT * FROM "song_comment"
        WHERE "song_id" = $1;`;
    pool.query(queryString, [songId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching comments:', error);
            res.sendStatus(500);
        })
});

router.post('/comment/:songId', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const songId = req.params.songId;
    const comment = req.body.comment;
    const queryString = `
        INSERT INTO "song_comment" ("user_id", "song_id", "comment")
        VALUES($1, $2, $3);`;
    pool.query(queryString, [userId, songId, comment])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error posting comment:', error);
            res.sendStatus(500);
        })
})

router.put('/comment/:id', rejectUnauthenticated, (req, res) => {
    const comment = req.body.comment;
    const commentId = req.params.id;
    const userId = req.user.id;
    const queryString = `
        UPDATE "song_comment"
        SET "comment" = $1, "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "song_comment"."id" = $2 AND ("user_band"."user_id" = $3 OR "song"."user_id" = $3);`;
    pool.query(queryString, [comment, commentId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error updating comment:', error);
            res.sendStatus(500);
        })
})

router.delete('/comment/:id', rejectUnauthenticated, (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;
    const queryString = `
        UPDATE "song_comment"
        SET "archived_at" = NOW(), "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "song_comment"."id" = $1 AND ("user_band"."user_id" = $2 OR "song"."user_id" = $2);`;
    pool.query(queryString, [commentId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error updating comment:', error);
            res.sendStatus(500);
        })
})

module.exports = router;
