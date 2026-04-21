import { Hono, } from 'hono'
import Bun from 'bun'
import getCon from '../dbconn'; 
import UserRepo from '../repositories/UserRepo';
import PrismaUserRepo from '../repositories/PrismaUserRepo';
import prisma from '../repositories/Prisma';

const app = new Hono();
const userRepo = new PrismaUserRepo(prisma);


app.get('/', (c) => { 
     return c.text(Bun.env.DATABASE_URL || 'test')
     })


  app.post('/', async (c) => {
  const user = await c.req.json();
  const pool = getCon();


  try {
    var result = await userRepo.createUser(user.name, user.email, user.password);
    
    return c.json({ 
      message: 'User added successfully!', 
        user: result
    }, 201);
  } catch (err) {
    console.error(err);
    return c.json({ error: 'Failed to add user to database ' }, 500);
  } finally {
    await pool.end();
  }
});


app.put('/:id',async (c) => {
  const id = c.req.param('id');
  const user = await c.req.json();
  const pool=getCon();

 try {
    var result =await pool.query('UPDATE "users" SET name=$1 , email=$2, password= $3, department=$4, department2=$5 WHERE id = $6', [user.name ,user.email,user.password, user.department, user.department2, id ]);
    return c.json({ message: `User ${id} updated to ${user.name}` });
  } catch (err) {
    return c.json({ error: 'Update failed' }, 500);
  } finally {
    await pool.end();
  } 
});


app.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const pool = getCon();

  try {
    await pool.query('DELETE FROM "users" WHERE id = $1', [id]);
    return c.json({ message: `User ${id} deleted` });
  } catch (err) {
    return c.json({ error: 'Delete failed' }, 500);
  } finally {
    await pool.end();
  }
});


export default app;