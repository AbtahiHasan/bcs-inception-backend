import { Router } from "express";
import { auth_routes } from "./modules/auth/auth.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
