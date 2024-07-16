import express from 'express';
import router from './routes/usersRoutes';

const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", router);

app.listen(port, () => {
    console.log('Opened server on port ', 3000);
})