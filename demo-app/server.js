const db = require('./db');
const createApp = require('./app');

const app = createApp(db);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VibeShop API running on http://localhost:${PORT}`);
});
