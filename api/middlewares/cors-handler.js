const cors = require('cors');

const corsHandler = (app) => {
  const corsOptions = {
    origin: 'http://localhost:4200',
  };

  app.use(cors(corsOptions));
};

module.exports = corsHandler;
