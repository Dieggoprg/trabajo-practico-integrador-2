import { ArticlesModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article1 = await ArticlesModel.findByPk(req.params.id);

    if (req.user.role !== "admin" && req.user.id !== article1.user_id) {
      return res.status(403).json({ message: "He is not the author" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const authorMiddleware = async (req, res, next) => {
  try {
    const article2 = await ArticlesModel.findByPk(req.params.id);

    if (req.user.id !== article2.user_id) {
      return res.status(403).json({ message: "He is not the author" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
