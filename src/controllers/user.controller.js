//user controller
import { UserModel } from "../models/user.model.js";

//create
//ya no lo hago porque esto lo realizo en el Auth a la hora de Registrar 

//getAll
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      {},
      { _id: 0, password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );

    if (!users) {
      return res.status(404).json({
        ok: false,
        msg: "users not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: users,
      },
      console.log(users)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//getById
export const getByIdUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id, {
      _id: 0,
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "user not found",
      });
    }

    return res.status(302).json(
      {
        ok: true,
        data: user,
      },
      console.log(user)
    );
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//update
export const updateUsers = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(id, {
      username,
      email,
      password,
      role,
      profile,
    });

    return res.status(201).json({
      ok: true,
      msg: "User updated",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};

//delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "User deleted",
    });
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Internal server error",
    });
  }
};
