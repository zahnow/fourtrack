const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all songs user has access to
router.get('/', (req, res) => {
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
    WHERE "user_band"."user_id" = $1 OR "song"."user_id" = $1;`;
    
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
router.get('/:songId', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:songId', (req, res) => {
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
router.delete('/:songId', (req, res) => {
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

module.exports = router;
