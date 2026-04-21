import { Hono, } from 'hono'
import Bun from 'bun'
import getCon from './dbconn'; 
import { logger } from 'hono/logger'
import Routes from './controllers/Routes';

const app = new Hono();

app.use('*', logger());
app.route('/user', Routes);

export  default app;
