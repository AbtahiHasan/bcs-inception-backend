ALTER TABLE "contacts" DROP CONSTRAINT "contacts_email_unique";--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "phone_number" varchar(15) NOT NULL;