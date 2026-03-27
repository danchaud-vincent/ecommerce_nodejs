import { buildApp } from './app/app';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 3000;

const app = buildApp();

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
