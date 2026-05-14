import { Hono, } from 'hono'
import Bun from 'bun'
import getCon from './dbconn'; 
import { logger } from 'hono/logger'
import Routes from './controllers/Routes';
import authRouter from './auth/routes/router';
import { AuthService } from './auth';

const app = new Hono();

app.use('*', logger());
app.basePath("/api").route('/user', Routes);

app.basePath("/api").route('/auth', authRouter);


app.post("/auth/register", async (c) => {

  const body = await c.req.json();

  try {

    const result = await AuthService.registerUser(
      body.name,
      body.email,
      body.password
    );

    return c.json({
      success: true,
      data: result,
    });

  } catch (error) {

    return c.json({
      success: false,
      error,
    }, 400);
  }
});

app.post("/auth/login", async (c) => {

  const body = await c.req.json();

  try {

    const result = await AuthService.signInUser(
      body.email,
      body.password
    );

    return c.json({
      success: true,
      data: result,
    });

  } catch (error) {

    return c.json({
      success: false,
      error,
    }, 400);
  }
});


export  default app;
