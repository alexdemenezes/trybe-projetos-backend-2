const express = require('express');
const cors = require('cors');
const { usersRouter, loginRouter, tasksRouter } = require('./routes');

class App {
  constructor() {
    this.app = express();
    this.config();
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/api/users', usersRouter);
    this.app.use('/api/login', loginRouter);
    this.app.use('/api/tasks', tasksRouter);
  }

  start(PORT) {
    this.app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  }
}

module.exports = new App();
