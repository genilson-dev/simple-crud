import { Router } from "express";
const router = Router();

import {CreateUserController} from '../controllers/user/createUserController'
import { ListAllUserController } from "../controllers/user/ListUserController";
import { AuthUserController } from "../controllers/user/AuthUserController";
import {IsAuthenticated} from "../middlewares/isAuthenticated"
// As rotas ficaram aqui
router.post("/create", new CreateUserController().handle)
router.post("/login", new AuthUserController().handle)
router.get("/list/user",IsAuthenticated, new ListAllUserController().handle)

export {router}

