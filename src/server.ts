import cors from 'cors';
import express from 'express';
import cache from 'memory-cache';
import { createUserCard } from './createUserCard';
import { getScreenshot } from './getScreenshot';

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'DevTime card generator' });
});

app.get('/card/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(404).send('Unable to find user.');
  }

  const cachedImage = cache.get(userId);

  if (cachedImage) {
    return res
      .header({
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store'
      })
      .send(cachedImage);
  } else {
    try {
      const html = await createUserCard(userId);
      const screenshot = await getScreenshot(html);

      cache.put(userId, screenshot, 8 * 60 * 60);

      return res
        .header({
          'Content-Type': 'image/png',
          'Cache-Control': 'no-store'
        })
        .send(screenshot);
    } catch (e) {
      console.error(e);
      return res.status(400).send('Unable to create an image.');
    }
  }
});

app.get('/purge/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(404).send('Unable to find user.');
  }

  const cachedImage = cache.get(userId);

  if (cachedImage) {
    cache.del(userId);
    return res.status(200).send('Cache cleared.');
  } else {
    return res.status(404).send('Unable to find image.');
  }
});

app.listen(3000, () => console.log('Server running.'));
