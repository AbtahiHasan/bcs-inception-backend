CREATE TYPE "public"."ans_tag" AS ENUM('A', 'B', 'C', 'D');--> statement-breakpoint
ALTER TABLE "mcqs" ALTER COLUMN "ans_tag" SET DATA TYPE "public"."ans_tag" USING "ans_tag"::"public"."ans_tag";--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "tag" SET DATA TYPE "public"."ans_tag" USING "tag"::"public"."ans_tag";--> statement-breakpoint
ALTER TABLE "user_answers" ALTER COLUMN "ans_tag" SET DATA TYPE "public"."ans_tag" USING "ans_tag"::"public"."ans_tag";