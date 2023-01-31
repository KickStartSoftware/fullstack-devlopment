import { Router } from "express";
import { allAnalytics, baseAnalytics } from "./analytic.controllers";

const analyticRouter = Router();

analyticRouter.get("/",baseAnalytics);
analyticRouter.get("/all",allAnalytics);

export default analyticRouter;