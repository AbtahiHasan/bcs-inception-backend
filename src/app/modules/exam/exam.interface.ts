export interface i_exam_option {
  tag: string;
  option: string;
}

export interface i_exam_mcq {
  exam_id: string;
  question: string;
  explanation: string;
  ans_tag: string;
  options: i_exam_option[];
}

export interface i_exam {
  exam_code: string;
  exam_type: "daily" | "weekly" | "monthly" | "practice" | "free";
  title: string;
  duration: number;
  exam_date: string;
  subject_id: string;
  topic_id: string;
}
