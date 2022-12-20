import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

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
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
      }
      if (userId && userId !== "All") {
        user = await db.User.findOne({
          attributes: {
            exclude: ["password"],
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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          message: "your email is already in used !!!",
        });
      }

      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber: data.phoneNumber,
      });
      resolve({
        errCode: 0,
        message: "success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resole, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resole(hashPassword);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
        raw: false
      });

      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `The user is not exist!`,
        });
      }

      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          message: `Delete Succeed`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let editUser = (data) => {
  return new Promise(async (resolve, reject)=>{
    try {
      if(!data.id){
        resolve({
          errCode: 2,
          message: `Missing required parameters`
        })
      }
      let user = await db.User.findOne({where: {id: data.id}, raw: false})
      if (user){
        user.firstName = data.firstName,
        user.lastName = data.lastName,
        user.address = data.address
        await user.save()

        resolve({
          errCode: 0,
          message: `Update the user succeeds`
        })
      }else{
        resolve({
          errCode: 1,
          message: `User not found`
        })
      }
    } catch (error) {
      reject(error)
    }
  })
}
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  editUser:editUser
};
