import Router from "express";
import env from "../../config/env.js";

const adminRouter = Router()

adminRouter.post("/check", (req, res) => {
  const { token } = req.body;

  if (token === env.adminToken) {
    return res.json({ isAdmin: true });
  }

  return res.json({ isAdmin: false });
});

export default adminRouter;