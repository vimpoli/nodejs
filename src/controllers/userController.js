import userService from "../services/userService.js";

const createUser = async (req, res) => {
    try {
        const data = await userService.createUser(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json(error.message);
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
        res.status(500).json(error.message);
    }
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await userService.updateUser(id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await userService.deleteUser(id);
        res.status(200).json(`User deleted successfully with id: ${id}`);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export default { createUser, getUsers, getUserById, updateUser, deleteUser };