"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytic_controllers_1 = require("./analytic.controllers");
const analyticRouter = (0, express_1.Router)();
analyticRouter.get("/", analytic_controllers_1.baseAnalytics);
analyticRouter.get("/all", analytic_controllers_1.allAnalytics);
exports.default = analyticRouter;
