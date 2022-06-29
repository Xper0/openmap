import express from "express";
import Users from "../models/userList.js";
import session from "express-session";
import {createAccessToken} from "../utils/generateToken.js";




const Registration = async ( req, res ) => {
  try {
    console.log(req)
    const user = req.query;
    const findUser = await Users.findOne({email: user.email})
    if (!findUser){
      await Users.create(user)
    } if (findUser) {
      res.status(302).json({
        message: `Пользователь с таким email - ${user.email} уже зарагестрирован`
      })
    }
    // res.json({
    //   status: "ok",
    //   msg: "Юзер зарегистрирован"
    // })
  }catch (err) {
    res.json({
      status: "error",
      msg: "Ошибка регистрации"
    })
  }

}

const authUser = async (req, res) => {
  const { email } = req.query
  const user = await Users.findOne({email})
  // req.session.test = 1
  if (user) {
    const accessToken = createAccessToken(user._id)
    // req.session.email = user._doc.email
    // console.log(req.session)
    res.status(200).json({
      msg: "Добро пожаловать",
      result: user,
      token: accessToken
    })
  } else {
    res.status(200).json({
      status: "ok",
      msg: "пользователь не зарегистрирован"
    })
  }
}
const LogOut = async ( req, res ) => {
  req.session.destroy();
  res.json({
    status: "ок",
    msg:  "сессия ликвидирована"
  })
}

const Auntification = async ( req, res ) => {
  let { phone } = JSON.parse(req.body);
  const user = await Users.findOne({phone})
  // console.log(user)
  if (user) {
    req.session.phone = user._doc.phone
    console.log(req.session)
    res.json({
      status: "ok",
      result: user,
    })
  } else {
    return res.status(401).json({msg: "User not auntification"});
  }
}

export { Auntification, Registration, authUser, LogOut}