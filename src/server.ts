import express from 'express';
import prisma from './db';

const app = express();

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();

  return res.status(200).send(users);
});

app.listen(3000, () => console.log('Server running.'));
