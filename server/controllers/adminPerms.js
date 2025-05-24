// files
import userModel from "../models/userModel.js";

function sendError(res, code, msg) {
  return res.status(code).json({ success: false, message: msg });
}

function sendSuccess(res, code, msg) {
  return res.status(code).json({ success: true, message: msg });
}

export const roleAdd = async (req, res) => {
  const { assignedRole } = req.body;

  try {
    const user = await userModel.findById(req.userId);

    user.permRoles ??= [];
    user.permRoles.push(assignedRole);

    await user.save();

    return sendSuccess(res, 200, "Successfully added role");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const roleRemove = async (req, res) => {
  const { removedRole } = req.body;

  try {
    const user = await userModel.findById(req.userId);

    user.permRoles ??= [];
    user.permRoles.pull(removedRole);

    await user.save();

    return sendSuccess(res, 200, "Successfully removed role");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const userApprove = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const approvePrev = user.approved;

    user.approved = !approvePrev;
    await user.save();

    return sendSuccess(res, 200, "Successfully toggled approve user");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};

export const blackList = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const blackListPrev = user.blackList;

    user.blackList = !blackListPrev;
    await user.save();

    return sendSuccess(res, 200, "Successfully toggled blacklist user");
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
