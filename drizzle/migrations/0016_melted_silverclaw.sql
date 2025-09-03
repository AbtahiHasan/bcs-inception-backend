ALTER TABLE "subscriptions" ADD COLUMN "transaction_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP COLUMN "translation_id";