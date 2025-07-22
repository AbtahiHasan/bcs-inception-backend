ALTER TABLE "exams" ALTER COLUMN "exam_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ALTER COLUMN "duration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ALTER COLUMN "exam_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ALTER COLUMN "subject_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exams" ALTER COLUMN "topic_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subjects" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "subject_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "topics" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'student';