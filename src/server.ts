import { buildApp } from './app/app';

const app = buildApp();

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
