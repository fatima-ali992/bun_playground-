import { Hono, } from 'hono'
import Bun from 'bun'
import getCon from './dbconn'; 
import { logger } from 'hono/logger'
import Routes from './controllers/Routes';
import authRouter from './auth/routes/router';

const app = new Hono();

app.use('*', logger());
app.basePath("/api").route('/user', Routes);

app.basePath("/api").route('/auth', authRouter);

export  default app;
