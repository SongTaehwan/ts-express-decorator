import Express from 'express';
import bodyParser from 'body-parser';
import { route as loginRoute } from './routes/loginRoutes';

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(loginRoute);

app.listen(3000, () => {
  console.log('listening port on 3000');
});
