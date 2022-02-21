
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- USER TABLE --

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"created_at" timestamp NOT NULL DEFAULT 'NOW()',
	"updated_at" timestamp NOT NULL DEFAULT 'NOW()',
	"archived_at" timestamp,
	"user_profile_image_path" varchar(500),
	"role" varchar(255) NOT NULL DEFAULT 'user'	--Could enum this
);

-- Mock user (not actually an admin)
INSERT INTO "user" ("username", "email", "password", "first_name", "last_name")
VALUES ('admin', 'nzahnow@gmail.com', 'password', 'Nick', 'Zahnow');


-- BAND --

CREATE TABLE "band" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"band_profile_image_path" varchar(500),
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"archived_at" TIMESTAMP
);

-- Mock band
INSERT INTO "band" ("name")
VALUES ('Test Band');


-- USER BAND --

CREATE TABLE "user_band" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL REFERENCES "user",
	"band_id" integer NOT NULL REFERENCES "band",
	"role" VARCHAR(50) NOT NULL DEFAULT 'member' -- Could enum this
);

-- Mock user/band
INSERT INTO "user_band" ("user_id", "band_id")
VALUES ('1', '1');


-- SONG --

CREATE TABLE "song" (
	"id" serial PRIMARY KEY,
	"band_id" integer REFERENCES "band",
	"name" varchar(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"archived_at" TIMESTAMP,
	"description" varchar(500),
	"user_id" integer REFERENCES "user"
);

-- Mock song
INSERT INTO "song" ("name", "band_id", "user_id", "description")
VALUES ('Demo Song', '1', '1', 'This is a demo song for mock data.');


-- CLIP --

CREATE TABLE "clip" (
	"id" serial PRIMARY KEY,
	"song_id" integer REFERENCES "song",
	-- Add owner?
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"archived_at" TIMESTAMP,
	"path" varchar(500) NOT NULL,
	"name" varchar(255),
	"description" varchar(500),
	"start_time" FLOAT DEFAULT '0',
	"end_time" FLOAT
);

-- Mock clip
INSERT INTO "clip" ("song_id", "path", "name", "description")
VALUES ('1', '/test.mp3', 'Example clip', 'This is an example clip for testing purposes.');


-- SONG_COMMENT

CREATE TABLE "song_comment" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL REFERENCES "user",
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"archived_at" TIMESTAMP,
	"song_id" integer NOT NULL REFERENCES "song",
	"comment" VARCHAR(400) NOT NULL
);

DROP TABLE "song_comment";

-- Mock comment
INSERT INTO "song_comment" ("user_id", "song_id", "comment")
VALUES('1', '1', 'This is an example of a comment on a song. Pretty cool!');

-- CLIP COMMENT --
CREATE TABLE "clip_comment" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL REFERENCES "user",
	"created_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"updated_at" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	"archived_at" TIMESTAMP,
	"timestamp" integer, -- Not needed until stretch goals
	"clip_id" integer NOT NULL REFERENCES "clip",
	"comment" VARCHAR(400) NOT NULL
);

-- Mock comment
INSERT INTO "clip_comment" ("user_id", "clip_id", "comment", "timestamp")
VALUES ('1', '1', 'This is an example of a comment on a clip. Hypothetically it should reference 20 seconds into the clip.', '20');

