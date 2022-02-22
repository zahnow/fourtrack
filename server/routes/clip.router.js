const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/song/:songId', (req, res) => {
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

router.get('/band/:bandId', (req, res) => {
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

router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const queryString = `
        SELECT * FROM "clip"
        JOIN "song" on "clip"."song_id" = "song"."id"
        JOIN "user_band" on "song"."band_id" = "user_band"."band_id"
        WHERE "user_band"."user_id" = $1 OR "song"."user_id" = $1;`;
    pool.query(queryString, [userId])
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log('error fetching clips:', error);
            res.sendStatus(500);
        });
});

// TODO: if we add user to clip, add it here
router.post('/', (req, res) => {
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

router.put('/:clipId', (req, res) => {
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

router.delete('/:clipId', (req, res) => {
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

module.exports = router;