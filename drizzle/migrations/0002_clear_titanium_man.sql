CREATE TYPE "public"."subscription_status" AS ENUM('active', 'none');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_status" "subscription_status" DEFAULT 'none' NOT NULL;