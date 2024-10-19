DO $$ BEGIN
 CREATE TYPE "public"."stateTypeE" AS ENUM('WORKING', 'ERROR', 'UNDER_MAINTENENCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."roleTypeE" AS ENUM('SUPERUSER', 'OPERATOR', 'MAINTAINER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"timesc" text NOT NULL,
	"machine_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "jobs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "machines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"stateTypeE" "stateTypeE" DEFAULT 'WORKING' NOT NULL,
	"info" text DEFAULT 'no detected issues' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "machines_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"roleTypeE" "roleTypeE" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "jobs_id_idx" ON "jobs" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "machine_id_idx" ON "machines" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "users" ("id");