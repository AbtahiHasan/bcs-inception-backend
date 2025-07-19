import { Router } from "express";

type TRoute = {
  path: string;
  route: Router;
};
const router = Router();

const moduleRoutes: TRoute[] = [];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
