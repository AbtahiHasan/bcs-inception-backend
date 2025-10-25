import { faker } from "@faker-js/faker";
import {
  contacts,
  exams,
  mcqs,
  options,
  subjects,
  topics,
} from "../drizzle/schema";
import { db } from "./db"; // drizzle db instance

async function seed() {
  // 3. Contacts
  const contactsData = Array.from({ length: 30 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone_number: faker.helpers.replaceSymbols("+8801#########"),
    subject: faker.lorem.words(3),
    message: faker.lorem.sentence({ min: 10, max: 20 }),
    created_at: faker.date.past(),
  }));
  await db.insert(contacts).values(contactsData);

  // 4. Subjects
  const subjectsData = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    title: faker.word.words(2),
    created_at: faker.date.past(),
  }));
  await db.insert(subjects).values(subjectsData);

  // 5. Topics
  const topicsData = subjectsData.flatMap((subj) =>
    Array.from({ length: 3 }).map(() => ({
      id: faker.string.uuid(),
      subject_id: subj.id,
      title: faker.word.words(3),
      created_at: faker.date.past(),
    }))
  );
  await db.insert(topics).values(topicsData);

  // 6. Exams
  const examsData = topicsData.flatMap((topic) =>
    Array.from({ length: 2 }).map(() => ({
      id: faker.string.uuid(),
      exam_code: faker.string.alphanumeric(8),
      exam_type: faker.helpers.arrayElement([
        "daily",
        "weekly",
        "monthly",
        "practice",
        "question bank",
      ]),
      title: faker.lorem.sentence({ min: 3, max: 6 }),
      duration: faker.number.int({ min: 30, max: 180 }),
      exam_date: faker.date.future(),
      subject_id: topic.subject_id,
      topic_id: topic.id,
      created_at: faker.date.past(),
    }))
  );
  await db.insert(exams).values(examsData);

  // 7. MCQs
  const mcqsData = examsData.flatMap((exam) =>
    Array.from({ length: 5 }).map(() => ({
      id: faker.string.uuid(),
      exam_id: exam.id,
      question: faker.lorem.sentence({ min: 6, max: 12 }),
      question_image: faker.datatype.boolean() ? faker.image.url() : null,
      explanation: faker.lorem.sentence({ min: 10, max: 15 }),
      explanation_image: faker.datatype.boolean() ? faker.image.url() : null,
      ans_tag: faker.helpers.arrayElement(["A", "B", "C", "D"]) as
        | "A"
        | "B"
        | "C"
        | "D",
      created_at: faker.date.past(),
    }))
  );
  await db.insert(mcqs).values(mcqsData);

  // 8. Options
  const optionsData = mcqsData.flatMap((mcq) =>
    ["A", "B", "C", "D"].map((tag) => ({
      id: faker.string.uuid(),
      mcq_id: mcq.id,
      tag: tag as "A" | "B" | "C" | "D",
      option: faker.lorem.words(5),
    }))
  );
  await db.insert(options).values(optionsData);

  console.log("✅ Database seeded with correct dummy data!");
}

seed().catch(console.error);
