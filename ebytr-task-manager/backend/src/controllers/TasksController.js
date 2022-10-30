const TasksService = require('../services/TasksService');

class TasksController {
  async create(req, res) {
    try {
      const { email } = req.body.decoded;
      const { title, description, status } = req.body;
      const newTask = await TasksService.create({ title, description, status }, email);
      return res.status(201).json(newTask);
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async getAll(req, res) {
    try {
      const { email } = req.body.decoded;
      const tasks = await TasksService.getAll(email);
      return res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const task = await TasksService.getById(+id);

      if (task) {
        return res.status(200).json(task);
      }
      return res.status(404).json({ message: 'task not found' });
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async update(req, res) {
    try {
      const {
        id, title, description, status,
      } = req.body;
      await TasksService.update({
        id, title, description, status,
      });
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await TasksService.delete(+id);
      return res.status(200).end();
    } catch (e) {
      return res.status(500).json({ message: 'internal error' });
    }
  }
}

module.exports = new TasksController();
