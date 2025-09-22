//tags controller
import { TagsModel } from "../models/tag.model.js";

//create
export const createTag = async (req, res) => {
  const { name, description } = req.body;

  try {
    const tag = await TagsModel.create({
      name,
      description,
    });

    return res.status(201).json({
      ok: true,
      msg: "Tag created",
      data: tag,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getAll
export const getAllTags = async (req, res) => {
  try {
    const tags = await TagsModel.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!tags) {
      return res.status(404).json({
        ok: false,
        msg: "tags not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: tags,
      },
      console.log(tags)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getById
export const getByIdTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagsModel.findById(id, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!tag) {
      return res.status(404).json({
        ok: false,
        msg: "tag not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: tag,
      },
      console.log(tag)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//update
export const updateTags = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const tag = await TagsModel.findByIdAndUpdate(id, {
      name,
      description,
    });

    return res.status(201).json({
      ok: true,
      msg: "Tag updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//delete
export const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    await TagsModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "Tag deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};
