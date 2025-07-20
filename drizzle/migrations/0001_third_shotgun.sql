CREATE TABLE "user_answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"exam_id" uuid,
	"user_id" uuid,
	"mcq_id" uuid,
	"ans_tag" varchar(10)
);
--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_exam_id_exams_id_fk" FOREIGN KEY ("exam_id") REFERENCES "public"."exams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_mcq_id_mcqs_id_fk" FOREIGN KEY ("mcq_id") REFERENCES "public"."mcqs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "exam_user_idx" ON "user_answers" USING btree ("exam_id","user_id");