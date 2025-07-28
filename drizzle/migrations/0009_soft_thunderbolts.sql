CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"subject" varchar(255) NOT NULL,
	"message" varchar(1055) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "contacts_email_unique" UNIQUE("email")
);
