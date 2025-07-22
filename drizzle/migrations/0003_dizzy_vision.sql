ALTER TABLE "mcqs" ALTER COLUMN "exam_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mcqs" ALTER COLUMN "question" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mcqs" ALTER COLUMN "explanation" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mcqs" ALTER COLUMN "ans_tag" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "mcq_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "tag" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "options" ALTER COLUMN "option" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_answers" ALTER COLUMN "exam_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_answers" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_answers" ALTER COLUMN "mcq_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_answers" ALTER COLUMN "ans_tag" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_title_unique" UNIQUE("title");