const App = require('./app');
require('dotenv/config');

const PORT = process.env.SERVER_PORT || 3001;

App.start(PORT);
