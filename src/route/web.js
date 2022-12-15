import express from "express"
import homePage from "../controllers/homeController"
import userController from "../controllers/userController"
let router = express.Router()

let initWebRoutes = (app) => {
  router.get('/', homePage.getHomePage)
  router.get('/register', homePage.getRegister)
  router.post('/post-crud', homePage.postCRUD)
  router.get('/get-crud',homePage.getCRUD)
  router.get('/edit-crud', homePage.getEditCRUD)
  router.post('/put-crud', homePage.putCRUD)
  router.get('/delete-crud',homePage.deleteCRUD)

  router.post('/api/login',userController.handleLogin)
  router.get('/api/get-all-users',userController.handleGetAllUsers)

  return app.use("/", router)
}

module.exports = initWebRoutes

