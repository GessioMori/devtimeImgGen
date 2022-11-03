import express from 'express';
import cache from 'memory-cache';
import { createUserCard } from './createUserCard';
import { getScreenshot } from './getScreenshot';

const app = express();

app.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('Unable to create an image.');
  }

  const cachedImage = cache.get(userId);

  if (cachedImage) {
    return res
      .header({
        'Content-Type': 'image/png'
      })
      .send(cachedImage);
  } else {
    try {
      const html = await createUserCard(userId);
      const screenshot = await getScreenshot(html);

      cache.put(userId, screenshot, 8 * 60 * 60);

      return res
        .header({
          'Content-Type': 'image/png'
        })
        .send(screenshot);
    } catch {
      return res.status(400).send('Unable to create an image.');
    }
  }
});

app.listen(3000, () => console.log('Server running.'));
