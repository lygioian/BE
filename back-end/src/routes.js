import { Router } from "express";
import UserController from "./controllers/user";
import EventController from "./controllers/event";
var jwt = require("jwt-simple");
var secret = "aaaa";

const routes = Router();

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token == null){
        res.status(401).send('Auth error');
        return;
    }

    req.payload = jwt.decode(token, secret);
    next();
};

//User services
routes.post('/auth/login', UserController.login);
routes.get("/users", UserController.getAll);
routes.get("/users/:id", UserController.getById);
routes.post('/auth/signup', UserController.create);

//Me services
routes.patch('/me/changePassword', auth, UserController.changePassword);
routes.patch('/me', auth, UserController.update);

//Event services
routes.post('/events', auth, EventController.create);
routes.get("/events", EventController.getAll);
routes.get("/events/:id", EventController.getById);
routes.patch('/events/:id', auth, EventController.update);
routes.post('/events/:id/register', auth, EventController.register);
routes.post('/events/:id/cancel', auth, EventController.cancelRegister);

export default routes;
