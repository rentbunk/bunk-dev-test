const app = require('./app');
const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
