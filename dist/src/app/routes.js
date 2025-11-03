"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("./modules/auth/auth.routes");
const subject_routes_1 = require("./modules/subject/subject.routes");
const topic_routes_1 = require("./modules/topic/topic.routes");
const exam_routes_1 = require("./modules/exam/exam.routes");
const contact_routes_1 = require("./modules/contact/contact.routes");
const user_routes_1 = require("./modules/user/user.routes");
const analytics_routes_1 = require("./modules/analytics/analytics.routes");
const subscription_routes_1 = require("./modules/subscription/subscription.routes");
const note_routes_1 = require("./modules/note/note.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.auth_routes,
    },
    {
        path: "/subject",
        route: subject_routes_1.subject_routes,
    },
    {
        path: "/topic",
        route: topic_routes_1.topic_routes,
    },
    {
        path: "/exam",
        route: exam_routes_1.exam_routes,
    },
    {
        path: "/contact",
        route: contact_routes_1.contact_routes,
    },
    {
        path: "/user",
        route: user_routes_1.user_routes,
    },
    {
        path: "/analytics",
        route: analytics_routes_1.analytics_routes,
    },
    {
        path: "/subscription",
        route: subscription_routes_1.subscription_routes,
    },
    {
        path: "/note",
        route: note_routes_1.note_routes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
