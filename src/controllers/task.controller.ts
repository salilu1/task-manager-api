// src/controllers/task.controller.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const task = await prisma.tasks.create({ data: { title } });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const task = await prisma.tasks.update({
      where: { id: Number(id) },
      data: { completed },
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tasks.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
