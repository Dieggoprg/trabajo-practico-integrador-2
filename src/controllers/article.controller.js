//article controller
import { ArticlesModel } from "../models/article.model.js";

//create
export const createArticle = async (req, res) => {
  const { title, content, excerpt, status, author, tags } = req.body;

  try {
    const article = await ArticlesModel.create({
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });

    return res.status(201).json({
      ok: true,
      msg: "Article created",
      data: article,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    }, console.log(error));
  }
};

//getAll
export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticlesModel.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!articles) {
      return res.status(404).json({
        ok: false,
        msg: "articles not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: articles,
      },
      console.log(articles)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getById
export const getByIdArticles = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticlesModel.findById(id, {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!article) {
      return res.status(404).json({
        ok: false,
        msg: "article not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: article,
      },
      console.log(article)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//update
export const updateArticle = async (req, res) => {
  const { title, content, excerpt, status, author, tags } = req.body;
  const { id } = req.params;

  try {
    const article = await CommentModel.findByIdAndUpdate(id, {
      title,
      content,
      excerpt,
      status,
      author,
      tags,
    });

    return res.status(201).json({
      ok: true,
      msg: "Article updated",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//delete
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await ArticlesModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "Article deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};
