DO $$ BEGIN
 CREATE TYPE "public"."stateTypeE" AS ENUM('WORKING', 'ERROR', 'UNDER_MAINTENENCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"stateTypeE" "stateTypeE" NOT NULL,
	"info" text DEFAULT 'no detected issues' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "machines_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "machine_id_idx" ON "machines" ("id");