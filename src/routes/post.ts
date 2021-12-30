"use strict";
import express, { Request, Response } from "express";
let router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//GET
router.get("/", async (req: Request, res: Response) => {
  let allPosts = await prisma.post.findMany({
    select: {
      title: true,
      created_at: true,
      content: true,
      user: true,
    },
  });

  res.send(allPosts);
});

router.get("/post_id/:post_id", async (req: Request, res: Response) => {
  const { post_id } = req.params;

  let post = await prisma.post.findUnique({
    where: {
      id: parseInt(post_id),
    },
    select: {
      title: true,
      created_at: true,
      content: true,
      user: true,
    },
  });
  res.send(post);
});

router.get("/user_id/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;

  let userPosts = await prisma.post.findMany({
    where: {
      user_id: parseInt(user_id),
    },
    select: {
      title: true,
      created_at: true,
      content: true,
      user: true,
    },
  });
  res.send(userPosts);
});

//POST
router.post("/", async (req: Request, res: Response) => {
  const { title, user_id, content } = req.body;

  let userExists = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!userExists) {
    return res.status(400).json({
      msg: "user not found",
    });
  }

  let newPost = await prisma.post.create({
    data: {
      title,
      user_id,
      post: content,
    },
  });

  res.json(newPost);
});

//UPDATE
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title: title, content: content },
  });
  res.json(updatedPost);
});

//DELETE
router.delete("/:post_id", async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const deletedPost = await prisma.post.delete({
    where: {
      id: parseInt(post_id),
    },
  });
  res.json(deletedPost);
});

//ROUTER
module.exports = router;
