import { Request, Response, NextFunction } from 'express';
import { get, controller, use, post, bodyValidator } from './decorators';

// function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Request was made');
//   next();
// }

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

// prefix route
@controller('/auth')
class LoginController {
  @get('/login') // route
  // @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <Form method="post">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </Form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true};
      // redirect them to the root route
      res.redirect('/');
    } else {
      res.status(422).send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
