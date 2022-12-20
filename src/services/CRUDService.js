import bcrypt from "bcryptjs"
import db from "../models/index"

const salt = bcrypt.genSaltSync(10)

let createNewUser = async (data) => {
  return new Promise(async (resole, reject)=>{
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password:hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        phonenumber:data.phoneNumber,
      })
      resole('created new user')
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resole, reject)=> {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt)
      resole(hashPassword)
    } catch (error) {
      reject(error)
      console.log(error)
    }
  })
}

let getAllUser = () => {
  return new Promise(async (resole, reject)=>{
    try {
      let users = db.User.findAll({
        raw: true
      })
      resole(users)
    } catch (error) {
      reject(error)
    }
  })
}

let getUserById = (userId) => {
  return new Promise(async (resole, reject)=> {
    try {
      let user = await db.User.findOne({
        where: {id: userId}, 
        raw: true
      })
      if(user){
        resole([user])
      }else{
        resole([])
      }
    } catch (error) {
      reject(error)
    }
  })
}

let updateUserData =  (data) => {
  return new Promise( async (resole, reject)=>{
    try {
      const user = await db.User.findOne({where: {id: data.id}})
      if(user){
          user.firstName = data.firstName,
          user.lastName = data.lastName,
          user.address = data.address
        await user.save()
      }else{
        resole('update fail !!!')
      }
      const allUser = await db.User.findAll()
      resole(allUser)
    } catch (error) {
      reject(error)
    }
  })
}
let deleteById = (userId) => {
  return new Promise(async (resole, reject) => {
    try {
      const userFound = await db.User.findOne({where: {id: userId}})
      if(userFound){
        await userFound.destroy()
      }else{
        resole('not found')
      }
      const allUser = await db.User.findAll()
      resole(allUser)
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteById: deleteById
}