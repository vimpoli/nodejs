import authService from "../services/authService.js";
import { createJWT, verifyJWT } from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;
  try {
    if (!input) {
      return res.status(400).send("Required fields are missing");
    }

    if (!input.email) {
      return res.status(400).send("Email is required");
    }

    if (!input.password) {
      return res.status(400).send("Password is required");
    }

    const data = await authService.login(input);

    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });
    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const register = async (req, res) => {
  const input = req.body;
  try {
    if (!input) {
      return res.status(400).send("Required fields are missing");
    }
    if (!input.password) {
      return res.status(400).send("Password is required");
    }

    if (!input.confirmPassword) {
      return res.status(400).send("Confirm password is required");
    }

    if (input.password !== input.confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    const data = await authService.register(input);

    const authToken = createJWT(data);
    res.cookie("authToken", authToken, { maxAge: 86400 * 1000 });

    res.status(201).json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export default { register, login };
