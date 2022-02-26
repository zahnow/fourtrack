const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const queryString = `
        SELECT DISTINCT 
            "clip"."id", 
            "clip"."name", 
            "clip"."archived_at", 
            "clip"."song_id", 
            "clip"."description", 
            "clip"."start_time", 
            "clip"."end_time", 
            "clip"."path", 
            "clip"."updated_at", 
            "clip"."created_at", 
            COALESCE(JSONB_AGG(DISTINCT "clip_comment") filter (where "clip_comment"."id" is not null), '[]') as "comment" 
            FROM "clip"
        JOIN "song" on "clip"."song_id" = "song"."id"
        JOIN "user_band" on "song"."band_id" = "user_band"."band_id"
        LEFT JOIN "clip_comment" on "clip"."id" = "clip_comment"."clip_id"
        WHERE 
            "clip"."archived_at" IS NULL AND 
            "song"."archived_at" IS NULL AND 
            ("user_band"."user_id" = $1 OR "song"."user_id" = $1)
        GROUP BY "clip"."id";`;
    pool.query(queryString, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching clips:', error);
            res.sendStatus(500);
        });
});

router.get('/song/:songId', rejectUnauthenticated, (req, res) => {
    const songId = req.params.songId;
    const queryString = `
        SELECT * FROM "clip"
        WHERE "song_id" = $1;`;
    pool.query(queryString, [songId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching clips:', error);
            res.sendStatus(500);
        });
});

router.get('/band/:bandId', rejectUnauthenticated, (req, res) => {
    const bandId = req.params.bandId;
    const queryString = `
        SELECT * FROM "clip"
        JOIN "song" on "clip"."song_id" = "song"."id"
        WHERE "song"."band_id" = $1;`;
    pool.query(queryString, [bandId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching clips:', error);
            res.sendStatus(500);
        });
});

// TODO: if we add user to clip, add it here
router.post('/', rejectUnauthenticated, (req, res) => {
    const songId = req.body.song_id;
    const path = req.body.path;
    const name = req.body.name;
    const description = req.body.description;
    const queryString = `
        INSERT INTO "clip" ("song_id", "path", "name", "description")
        VALUES ($1, $2, $3, $4);`;
    pool.query(queryString, [songId, path, name, description])
        .then(response => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('error adding clip:', error);
            res.sendStatus(500);
        })
});

router.put('/:clipId', rejectUnauthenticated, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const clipId = req.params.clipId;
    const userId = req.user.id;
    const queryString = `
        UPDATE "clip"
        SET "name" = $1, "description"=$2, "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "clip"."id" = $3 AND ("user_band"."user_id" = $4 OR "song"."user_id" = $4);`;
    pool.query(queryString, [name, description, clipId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error updating clip:', error);
            res.sendStatus(500);
        });
});

router.delete('/:clipId', rejectUnauthenticated, (req, res) => {
    const clipId = req.params.clipId;
    const userId = req.user.id;
    const queryString = `
        UPDATE "clip"
        SET "archived_at" = NOW(), "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "clip"."id" = $1 AND ("user_band"."user_id" = $2 OR "song"."user_id" = $2);`;
    pool.query(queryString, [clipId, userId])
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('error updating clip:', error);
            res.sendStatus(500);
        });
});

///////////////////
// COMMENTS
///////////////////

router.get('/comment/:clipId', rejectUnauthenticated, (req, res) => {
    const clipId = req.params.clipId;
    const queryString = `
        SELECT * FROM "clip_comment"
        WHERE "clip_id" = $1;`;
    pool.query(queryString, [clipId])
    .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching comments:', error);
            res.sendStatus(500);
        })
});

router.post('/comment/:clipId', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const clipId = req.params.clipId;
    const comment = req.body.comment;
    const queryString = `
        INSERT INTO "clip_comment" ("user_id", "clip_id", "comment")
        VALUES($1, $2, $3);`;
    pool.query(queryString, [userId, clipId, comment])
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
        UPDATE "clip_comment"
        SET "comment" = $1, "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "clip_comment"."id" = $2 AND ("user_band"."user_id" = $3 OR "song"."user_id" = $3);`;
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
        UPDATE "clip_comment"
        SET "archived_at" = NOW(), "updated_at" = NOW()
        FROM "song", "user_band"
        WHERE "clip_comment"."id" = $1 AND ("user_band"."user_id" = $2 OR "song"."user_id" = $2);`;
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