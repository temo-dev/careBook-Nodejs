import userService from "../services/userService"

 let handleLogin = async (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if(!email || !password){
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!"
    })
  }

  let userData = await userService.handleUserLogin(email, password)

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    data: userData.user ? userData.user : {}
  })
 }

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id//All , ID
  if (!id){
    return res.status(500).json({
      errCode: 1,
      message:"Missing parameter !",
      data: []
    })
  }  


  let users = await userService.getAllUsers(id)

  return res.status(200).json({
    errCode: 0,
    message:"",
    data: users
  })
}

let hanldeCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body)
  return res.status(200).json(message)
}

let hanldeEditUser = async (req, res) => {
  let data = req.body
  let message = await userService.editUser(data)
  return res.status(200).json(message)
}

let hanldeDeleteUser = async (req, res) => {
  if (!req.body.id){
    return res.status(200).json({
      errCode: 1,
      message: 'Missing requied parameters!'
    })
  }
  let message = await userService.deleteUser(req.body.id)
  console.log(message)
  return res.status(200).json(message)
}
 module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  hanldeCreateNewUser: hanldeCreateNewUser,
  hanldeEditUser: hanldeEditUser,
  hanldeDeleteUser:hanldeDeleteUser
 }    