//comment controller
import { CommentModel } from "../models/comment.model.js";

//create
export const createComments = async (req, res) => {
  const { content, author, article } = req.body;

  try {
    const comment = await CommentModel.create({
      content,
      author,
      article,
    });

    return res.status(201).json({
      ok: true,
      msg: "Comment created",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getAll
export const getAllComments = async (req, res) => {
  try {
    const comment = await CommentModel.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!comment) {
      return res.status(404).json({
        ok: false,
        msg: "comments not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: comment,
      },
      console.log(comment)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getById
export const getByIdComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findById(id, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!comment) {
      return res.status(404).json({
        ok: false,
        msg: "comment not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: comment,
      },
      console.log(comment)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//update
export const updateComment = async (req, res) => {
  const { content, author, article } = req.body;
  const { id } = req.params;

  try {
    const comment = await CommentModel.findByIdAndUpdate(id, {
      content,
      author,
      article,
    });

    return res.status(201).json({
      ok: true,
      msg: "Comment updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//delete
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await CommentModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "Comment deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};
