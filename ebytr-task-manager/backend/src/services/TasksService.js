const Task = require('../models/Task');
const UsersService = require('./UsersService');

class TasksService {
  async create(task, email) {
    const { title, description, status } = task;
    const user = await UsersService.getByEmail(email);
    const newTask = await Task.create({
      title,
      description,
      status,
      userId: user.id,
    });

    return {
      id: newTask.id,
      title,
      description,
      status,
      userId: user.id,
    };
  }

  async getAll(email) {
    const user = await UsersService.getByEmail(email);
    const tasks = await Task.findAll({
      where: {
        userId: user.id,
      },
    });
    return tasks;
  }

  async getById(id) {
    const task = await Task.findOne({
      where: {
        id,
      },
    });
    return task;
  }

  async update(task) {
    const {
      id, title, description, status,
    } = task;
    await Task.update({ title, description, status }, {
      where: {
        id,
      },
    });
  }

  async delete(id) {
    await Task.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new TasksService();
