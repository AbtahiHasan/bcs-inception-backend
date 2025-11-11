CREATE TYPE "public"."payment_method_enum" AS ENUM('bkash', 'nagad');--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "payment_method" "payment_method_enum" NOT NULL;