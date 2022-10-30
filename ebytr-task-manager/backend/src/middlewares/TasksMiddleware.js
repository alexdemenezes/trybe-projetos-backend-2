/* eslint-disable consistent-return */
class TasksMiddleware {
  verfifyTitle(req, res, next) {
    const { title } = req.body;
    if (title) {
      next();
    } else {
      return res.status(400).json({ message: 'title field must be filled' });
    }
  }

  verifyStatus(req, res, next) {
    const { status } = req.body;
    if (status) {
      next();
    } else {
      return res.status(400).json({ message: 'status field must be filled' });
    }
  }
}

module.exports = new TasksMiddleware();
