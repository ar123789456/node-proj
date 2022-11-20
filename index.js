import express from 'express';


const port = process.env.PORT??3000;
const app = express();

//static files
app.use(express.static('public'));

//routes
//auth
app.get('/api/auth', )

//start server
app.listen(port, () => {
    console.log('Server on port 3000');
})