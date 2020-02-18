import { Router, Request, Response } from 'express';

const route = Router();

route.get('/login', (req: Request, res: Response) => {
  res.send(`
    <Form method="post">
      <input name="email" />
      <input name="password" />
      <button type="submit">Login</button>
    </Form>
  `);
});

route.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  res.send(email+password)
});

export { route };
