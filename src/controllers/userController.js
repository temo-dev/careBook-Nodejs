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
  let id = req.body.id//All , ID
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


 module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers
 }    