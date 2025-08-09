import bcrypt from "bcryptjs";
import User from "../models/User.js";
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from "../utils/email.js";
import config from "../config/config.js";

const login = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw { statusCode: 404, message: "User not found" };

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch)
    throw { statusCode: 400, message: "Incorrect email or password" };

  return {
    _id: user._id,
    name: user.name,
    address: user.address,
    email: user.email,
    phone: user.phone,
    roles: user.roles,
  };
};

const register = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (user) throw { statusCode: 400, message: "User already exists" };

  const hashedPassword = bcrypt.hashSync(data.password);

  const registeredUser = await User.create({
    name: data.name,
    address: data.address,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
  });

  return {
    _id: registeredUser._id,
    name: registeredUser.name,
    address: registeredUser.address,
    email: registeredUser.email,
    phone: registeredUser.phone,
    roles: registeredUser.roles,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) return;
  /**
   * 1. Create a token
   * 2. Send an email with the token and reset password link
   * 3. Store token in DB
   */
  const resetToken = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token: resetToken,
  });

  await sendEmail(email, {
    subject: "Reset Password Link",
    body: `
      <!DOCTYPE html>
      <html>
        <body style="font-family:sans-serif;background:#f4f4f4;padding:20px;">
          <div style="max-width:500px;margin:auto;background:#fff;padding:20px;border-radius:8px;">
            <h2 style="color:#333;">Password Reset</h2>
            <p>Click the button below to reset your password.</p>
            <a href=${config.appUrl}/reset-password?resetToken=${resetToken}&userId=${user._id} style="display:inline-block;padding:10px 16px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">Reset Password</a>
            <p style="font-size:12px;color:#666;margin-top:15px;">If you didn’t request this, ignore this email.</p>
          </div>
        </body>
      </html>
`,
  });

  return { message: "Reset password link sent successfully" };
};

const resetPassword = async (userId, resetToken, newPassword) => {
  const data = await ResetPassword.findOne({
    userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ expiresAt: -1 });

  if (!data || data.token !== resetToken)
    throw { statusCode: 404, message: "Invalid or expired token" };

  if (data.isUsed) {
    throw { statusCode: 500, message: "Token has already been used" };
  }

  const hashedPassword = bcrypt.hashSync(newPassword);

  await User.findByIdAndUpdate(userId, { password: hashedPassword });
  await ResetPassword.findByIdAndUpdate(data._id, { isUsed: true });

  return { message: "Password reset successfully" };
};

export default { register, login, forgotPassword, resetPassword };
