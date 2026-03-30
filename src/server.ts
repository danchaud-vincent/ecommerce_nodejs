import { config } from 'dotenv';
import { buildApp } from './app/app';
import { initDB } from './database/db';

config();
const PORT = process.env.PORT || 3000;

initDB()
  .then(() => {
    const app = buildApp();

    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Cannot start server, DB not connected', err);
  });
