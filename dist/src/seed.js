"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const schema_1 = require("../drizzle/schema");
const db_1 = require("./db"); // drizzle db instance
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        // 3. Contacts
        const contactsData = Array.from({ length: 30 }).map(() => ({
            id: faker_1.faker.string.uuid(),
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            phone_number: faker_1.faker.helpers.replaceSymbols("+8801#########"),
            subject: faker_1.faker.lorem.words(3),
            message: faker_1.faker.lorem.sentence({ min: 10, max: 20 }),
            created_at: faker_1.faker.date.past(),
        }));
        yield db_1.db.insert(schema_1.contacts).values(contactsData);
        // 4. Subjects
        const subjectsData = Array.from({ length: 5 }).map(() => ({
            id: faker_1.faker.string.uuid(),
            title: faker_1.faker.word.words(2),
            created_at: faker_1.faker.date.past(),
        }));
        yield db_1.db.insert(schema_1.subjects).values(subjectsData);
        // 5. Topics
        const topicsData = subjectsData.flatMap((subj) => Array.from({ length: 3 }).map(() => ({
            id: faker_1.faker.string.uuid(),
            subject_id: subj.id,
            title: faker_1.faker.word.words(3),
            created_at: faker_1.faker.date.past(),
        })));
        yield db_1.db.insert(schema_1.topics).values(topicsData);
        // 6. Exams
        const examsData = topicsData.flatMap((topic) => Array.from({ length: 2 }).map(() => ({
            id: faker_1.faker.string.uuid(),
            exam_code: faker_1.faker.string.alphanumeric(8),
            exam_type: faker_1.faker.helpers.arrayElement([
                "daily",
                "weekly",
                "monthly",
                "practice",
                "question bank",
            ]),
            title: faker_1.faker.lorem.sentence({ min: 3, max: 6 }),
            duration: faker_1.faker.number.int({ min: 30, max: 180 }),
            exam_date: faker_1.faker.date.future(),
            subject_id: topic.subject_id,
            topic_id: topic.id,
            created_at: faker_1.faker.date.past(),
        })));
        yield db_1.db.insert(schema_1.exams).values(examsData);
        // 7. MCQs
        const mcqsData = examsData.flatMap((exam) => Array.from({ length: 5 }).map(() => ({
            id: faker_1.faker.string.uuid(),
            exam_id: exam.id,
            question: faker_1.faker.lorem.sentence({ min: 6, max: 12 }),
            question_image: faker_1.faker.datatype.boolean() ? faker_1.faker.image.url() : null,
            explanation: faker_1.faker.lorem.sentence({ min: 10, max: 15 }),
            explanation_image: faker_1.faker.datatype.boolean() ? faker_1.faker.image.url() : null,
            ans_tag: faker_1.faker.helpers.arrayElement(["A", "B", "C", "D"]),
            created_at: faker_1.faker.date.past(),
        })));
        yield db_1.db.insert(schema_1.mcqs).values(mcqsData);
        // 8. Options
        const optionsData = mcqsData.flatMap((mcq) => ["A", "B", "C", "D"].map((tag) => ({
            id: faker_1.faker.string.uuid(),
            mcq_id: mcq.id,
            tag: tag,
            option: faker_1.faker.lorem.words(5),
        })));
        yield db_1.db.insert(schema_1.options).values(optionsData);
        console.log("✅ Database seeded with correct dummy data!");
    });
}
seed().catch(console.error);
