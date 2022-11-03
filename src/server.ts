import express from 'express';
import { createUserCard } from './createUserCard';
import { getScreenshot } from './getScreenshot';

const app = express();

app.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).send('Unable to create an image.');
  }
  try {
    const html = await createUserCard(userId);
    const screenshot = await getScreenshot(html);

    return res
      .header({
        'Content-Type': 'image/png'
      })
      .send(screenshot);
  } catch {
    return res.status(400).send('Unable to create an image.');
  }
});

app.listen(3000, () => console.log('Server running.'));
