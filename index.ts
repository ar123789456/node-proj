import express from 'express';
import {AUTH, TODO} from "./delivery/http/routers";
import {AuthRepository, TodosRepository} from "./repository/mongo";
import {AuthUsecase, TodosUseCase} from "./usecase/usecase";
import mongoose, {model} from "mongoose";
import {ITodo, IUser, TodoSchema, UserSchema} from "./models/models";
import morgan from "morgan";
import {Auth} from "./middlewares/auth";
import cookieParser from "cookie-parser";

/**
 * @name Todos CRUD
 * @description Simple CRUD for todos
 * @description Using express, mongoose, typescript
 * @description Realized with clean architecture
 * @description i think it's not bad
 * @description shot i use context for passing user id
 */

/**Connect .env*/
require('dotenv').config()
/**set port*/
const port = process.env.PORT ?? 3000;
const app = express();

/**app middlewares*/
app.use(express.json());
app.use(cookieParser());
app.use(morgan("[:date[iso]] Started :method :url for :remote-addr", {immediate: true,}));
app.use(morgan("[:date[iso]] Completed :status :res[content-length] in :response-time ms"))
/** distributed static folder */
app.use(express.static('public'));
/**connect to mongo*/
mongoose.connect(process.env.MONGO_URL+"/test").then(()=> {
    console.log('Connected to mongo');

    /**init repositories*/
    const authRepo = new AuthRepository(model<IUser>('User', UserSchema));
    const todosRepo = new TodosRepository(model<ITodo>('Todo', TodoSchema));
    /**init usecases*/
    const authUseCase = new AuthUsecase(authRepo);
    const todosUseCase = new TodosUseCase(todosRepo);
    /**init auth and todos services*/
    const authService = new AUTH(authUseCase)
    const todosService = new TODO(todosUseCase)
    /**connect auth routers*/
    const authRouter = express.Router();
    authRouter.post('/login', (req, res) => authService.login(req, res));
    authRouter.post('/logout', (req, res) => authService.logout(req, res));
    authRouter.post('/register', (req, res) => authService.register(req, res));

    app.use(authRouter)
    /**connect todos routers*/
    const todosRouter = express.Router();
    todosRouter.get('/todos',Auth, (req, res) => todosService.get(req, res));
    todosRouter.post('/todo',Auth, (req, res) => todosService.create(req, res));
    todosRouter.put('/todo/:id',Auth, (req, res) => todosService.update(req, res));

    app.use(todosRouter)
    /**start server*/
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});