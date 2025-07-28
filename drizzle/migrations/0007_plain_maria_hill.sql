ALTER TYPE "public"."exam_type" ADD VALUE 'question bank';--> statement-breakpoint
CREATE INDEX "exam_user_idx" ON "user_answers" USING btree ("exam_id","user_id");