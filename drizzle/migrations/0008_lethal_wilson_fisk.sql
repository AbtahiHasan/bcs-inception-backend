ALTER TABLE "exams" ALTER COLUMN "exam_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."exam_type";--> statement-breakpoint
CREATE TYPE "public"."exam_type" AS ENUM('daily', 'weekly', 'monthly', 'practice', 'question bank');--> statement-breakpoint
ALTER TABLE "exams" ALTER COLUMN "exam_type" SET DATA TYPE "public"."exam_type" USING "exam_type"::"public"."exam_type";