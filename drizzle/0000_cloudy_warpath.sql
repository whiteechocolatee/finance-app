CREATE TABLE IF NOT EXISTS "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"plaidId" text,
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
