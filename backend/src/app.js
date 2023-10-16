import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRouter from './Router/user.router.js';
import ProfileRouter from './Router/profile.router.js';
import HostalRouter from './Router/hostal.router.js';
import DetailsRouter from './Router/details.router.js';
import BookingsRouter from './Router/booking.router.js';
import PayRouter from './Router/pay.router.js';
import CommentRouter from './Router/comment.router.js';
import SendEmailRouter from './Router/send.email.js';

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));

app.use('/api', UserRouter);
app.use('/api',ProfileRouter);
app.use('/api',HostalRouter);
app.use('/api',DetailsRouter);
app.use('/api',BookingsRouter);
app.use('/api',PayRouter);
app.use('/api',CommentRouter);
app.use('/api',SendEmailRouter);

export default app;