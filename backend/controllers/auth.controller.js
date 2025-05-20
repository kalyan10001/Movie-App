import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const RegisterUser= async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await new User({ name, email, password: hash, role });
  await user.save();
  res.status(201).json({ message: "User registered" });
};

export const LoginUser= async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
};

