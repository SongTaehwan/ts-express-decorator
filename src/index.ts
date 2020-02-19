import express from 'express';
import bodyParser from 'body-parser';
import { router as loginRoute } from './routes/loginRoutes';
import cookieSession from 'cookie-session';

const app = express();

// add in a body property to request
app.use(bodyParser.urlencoded({ extended: true }));
// add in a session property to request
app.use(cookieSession({ keys: ['asdf'] }));
app.use(loginRoute);

app.listen(3000, () => {
  console.log('listening port on 3000');
});

// Easy Refactor, NOT GOOD
// No immediate benefit that you can gain 
// class Server {
//   app: express.Express = express();

//   constructor() {
//     app.use(bodyParser.urlencoded({ extended: true }));
//     app.use(cookieSession({ keys: ['asdf'] }));
//     app.use(loginRoute);
//   }

//   start(): void {
//     this.app.listen(3000, () => {
//       console.log('listening port on 3000');
//     });
//   }
// }

// new Server().start();

