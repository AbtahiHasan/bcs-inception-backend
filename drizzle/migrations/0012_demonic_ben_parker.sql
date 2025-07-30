ALTER TABLE "subjects" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "topics" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();