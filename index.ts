import express from 'express';
import {AUTH, TODO} from "./delivery/http/routers";
import {AuthRepository, TodosRepository} from "./repository/mongo";
import {AuthUsecase, TodosUseCase} from "./usecase/usecase";
import mongoose, {model} from "mongoose";
import {ITodo, IUser, TodoSchema, UserSchema} from "./models/models";
import morgan from "morgan";
import {Auth} from "./middlewares/auth";
import cookieParser from "cookie-parser";

require('dotenv').config()

const port = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(morgan("[:date[iso]] Started :method :url for :remote-addr", {immediate: true,}));

app.use(morgan("[:date[iso]] Completed :status :res[content-length] in :response-time ms"))
//static files
app.use(express.static('public'));
//init db
mongoose.connect(process.env.MONGO_URL+"/test").then(()=> {
    console.log('Connected to mongo');

    //init repos
    const authRepo = new AuthRepository(model<IUser>('User', UserSchema));
    const todosRepo = new TodosRepository(model<ITodo>('Todo', TodoSchema));
    //init usecases
    const authUseCase = new AuthUsecase(authRepo);
    const todosUseCase = new TodosUseCase(todosRepo);
    //init delivery
    const authService = new AUTH(authUseCase)
    const todosService = new TODO(todosUseCase)
    //init routers
    const authRouter = express.Router();
    authRouter.post('/login', (req, res) => authService.login(req, res));
    authRouter.post('/logout', (req, res) => authService.logout(req, res));
    authRouter.post('/register', (req, res) => authService.register(req, res));

    app.use(authRouter)
//todos
    const todosRouter = express.Router();
    todosRouter.get('/todos',Auth, (req, res) => todosService.get(req, res));
    todosRouter.post('/todo',Auth, (req, res) => todosService.create(req, res));
    todosRouter.put('/todo/:id',Auth, (req, res) => todosService.update(req, res));

    app.use(todosRouter)
    //start server
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});