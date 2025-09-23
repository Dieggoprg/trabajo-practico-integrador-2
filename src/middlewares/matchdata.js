import { matchedData } from "express-validator";

export const validateData = async (req, res, next) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ Message: "The data must be correct." });
    }
    req.data = data;
    next();
  } catch (error) {
    res.status(500).json({ Message: "Internal server error" });
  }
};
