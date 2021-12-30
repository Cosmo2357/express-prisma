"use strict";
import express, { Request, Response } from "express";
let router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET
router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      posts: true,
    },
  });
  res.json(users);
});

//POST
router.post("/", async (req: Request, res: Response) => {
  const { username } = req.body;
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });

  if (userExists) {
    return res.status(400).json({
      msg: "user already exists",
    });
  }

  let newUser = await prisma.user.create({
    data: {
      username,
    },
  });

  res.json(newUser);
});

//UPDATE
router.put("/", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {} = req.body;
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {},
  });
  res.json(updatedUser);
});

//DELETE
router.delete("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(user_id),
    },
  });
  res.json(deletedUser);
});

module.exports = router;
