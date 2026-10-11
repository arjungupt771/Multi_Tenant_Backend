// src/controllers/auth.controller.js
import { signupService, loginService } from "../services/auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const { orgName, email, password } = req.body;

    const result = await signupService({ orgName, email, password });

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, orgName } = req.body;
    const result = await loginService({ email, password, orgName });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
