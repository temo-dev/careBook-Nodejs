import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let comparePassword = await bcrypt.compareSync(
            password,
            user.password
          );
          if (comparePassword) {
            (userData.errCode = 0), (userData.errMessage = "");
            delete user.password;
            userData.user = user;
          } else {
            (userData.errCode = 3), (userData.errMessage = "wrong Password");
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email is not exist in your system. Plz try other email!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId && userId === "All") {
        user = await db.User.findAll({
          attributes:{
            exclude: ['password']
          },
          raw: true,
        });
      }
      if (userId && userId !== "All" ) {
        user = await db.User.findOne({
          attributes:{
            exclude: ['password']
          },
          where: { id: userId },
          raw: true,
        });
      }
      resolve(user);
    } catch (error) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
