import { Router } from "express";
import { auth_routes } from "./modules/auth/auth.routes";
import { subject_routes } from "./modules/subject/subject.routes";
import { topic_routes } from "./modules/topic/topic.routes";
import { exam_routes } from "./modules/exam/exam.routes";
import { contact_routes } from "./modules/contact/contact.routes";
import { user_routes } from "./modules/user/user.routes";
import { analytics_routes } from "./modules/analytics/analytics.routes";
import { subscription_routes } from "./modules/subscription/subscription.routes";

type TRoute = {
  path: string;
  route: Router;
};
const router = Router();

const moduleRoutes: TRoute[] = [
  {
    path: "/auth",
    route: auth_routes,
  },
  {
    path: "/subject",
    route: subject_routes,
  },
  {
    path: "/topic",
    route: topic_routes,
  },
  {
    path: "/exam",
    route: exam_routes,
  },
  {
    path: "/contact",
    route: contact_routes,
  },
  {
    path: "/user",
    route: user_routes,
  },
  {
    path: "/analytics",
    route: analytics_routes,
  },
  {
    path: "/subscription",
    route: subscription_routes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
