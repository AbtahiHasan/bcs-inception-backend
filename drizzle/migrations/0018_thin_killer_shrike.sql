ALTER TABLE "subscriptions" ALTER COLUMN "start" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "start" DROP NOT NULL;