"use strict";
import express, { Request, Response } from "express";
let router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    const users = await user.findMany({
      select: {
        username: true,
        posts: true,
      },
    });
    res.json(users);
  })
  .put(async (req: Request, res: Response) => {})
  .delete(async (req: Request, res: Response) => {});

module.exports = router;
