import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();



// ✅ Create a task
router.post('/', async (req, res) => {
  const { title } = req.body;
  const task = await prisma.tasks.create({ data: { title } });
  res.json(task);
});

// ✅ Get all tasks
router.get('/', async (_req, res) => {
  const tasks = await prisma.tasks.findMany();
  res.json(tasks);
});

// ✅ Update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = await prisma.tasks.update({
    where: { id: Number(id) },
    data: { title, completed },
  });
  res.json(task);
});

// ✅ Delete task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.tasks.delete({ where: { id: Number(id) } });
  res.json({ message: 'Task deleted' });
});

// 👇 Export the router so it becomes a module
export default router;
