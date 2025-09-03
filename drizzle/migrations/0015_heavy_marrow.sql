CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"pdf_link" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
