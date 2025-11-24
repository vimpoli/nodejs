import userService from "../services/userService.js";

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  const data = await userService.getUsers();

  res.status(200).json(data);
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const input = req.body;
  const user = req.user;

  try {
    const updatedUser = await userService.updateUser(id, input, user);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateUserRoles = async (req, res) => {
  const id = req.params.id;
  const input = req.body;
  const user = req.user;

  try {
    const updatedUser = await userService.updateUserRoles(id, input, user);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProfilemage = async (req, res) => {
  const id = req.params.id;
  const file = req.file;
  const user = req.user;

  try {
    const updatedUser = await userService.updateProfilemage(id, file, user);

    res.json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createMerchant = async (req, res) => {
  const userId = req.body.userId;

  try {
    if (!userId) return res.status(400).send("Merchant id is required");

    const data = await userService.createMerchant(userId);

    res.json(data);
  } catch (error) {}
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await userService.deleteUser(id);

    res.status(200).json(`User deleted successfully with id: ${id}`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateProfilemage,
  createMerchant,
  updateUserRoles,
  deleteUser,
};
