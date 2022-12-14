import db from "../models/index"
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, resp) => {
  try {
    let data = await db.User.findAll()
    return resp.render('homepage.ejs',{
      data: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error)
  }
}

let getRegister = async (req, resp) => {
  return resp.render('register.ejs')
}

let postCRUD = async (req, resp) => {
 let message = await CRUDService.createNewUser(req.body)
 console.log(message) 
  return resp.send('post crud from server')
}

let getCRUD = async (req, resp) => {
  let data = await CRUDService.getAllUser()
  return resp.render('displayCRUD.ejs',{
    dataTable: data
  })
}

let getEditCRUD = async (req, resp) => {
  let userId = req.query.id
  if(userId){
    let user = await CRUDService.getUserById(userId)
    if(user.length > 0){
      return resp.render('editCRUD.ejs',{
        data: user[0]
      })
    }else{
      return resp.send("Not Found !!!")
    }
  }else{
    return resp.send("Not Found !!!")
  }
}


let putCRUD = async (req, resp) => {
  let data = req.body
  let allUser = await CRUDService.updateUserData(data)
  if(allUser){
    return resp.render('displayCRUD.ejs',{
      dataTable: allUser
    })
  }else{
    return resp.send("Not found")
  }
  
}

let deleteCRUD = async (req, resp) => {
  let userId = req.query.id
  let allUser = await CRUDService.deleteById(userId)
  if(allUser){
    return resp.render('displayCRUD.ejs',{
      dataTable: allUser
    })
  }else{
    return resp.send("Not found")
  }
}

module.exports = {
  getHomePage: getHomePage,
  getRegister: getRegister,
  postCRUD: postCRUD,
  getCRUD:getCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD
}