import Task from '../../models/Task';
import formatErrors from '../../config/formatError';
import { memberPermision } from '../../config/permisions';

export default {
  createTask: async (parent, { teamId, ...args }, { user }) => {
    try {
      await memberPermision(user, teamId);
      const task = await Task.create(args);
      return {
        ok: true,
        task,
      };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
  updateTask: async (parent, { _id, teamId, ...args }, { user }) => {
    try {
      await memberPermision(user, teamId);
      const task = await Task.findByIdAndUpdate(_id, args, { new: true });
      return {
        ok: true,
        task,
      };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
  addSubTask: async (parent, { _id, teamId, ...args }, { user }) => {
    try {
      await memberPermision(user, teamId);
      const task = await Task.findById(_id);
      task.subTask.push(args);
      task.save();
      return {
        ok: true,
        task,
      };
    } catch (e) {
      return {
        ok: false,
        errors: formatErrors(e),
      };
    }
  },
};
