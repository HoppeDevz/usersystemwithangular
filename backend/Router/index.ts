import { Router } from 'express';
import UserController from '../Controllers/UserController';

const route = Router();

route.use("/LoginUser", UserController.LoginUser);
route.use("/RegisterUser", UserController.RegisterUser);

export default route;
