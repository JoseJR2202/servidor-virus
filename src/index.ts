import './config/alias'
import express from 'express';
import cors  from 'cors';
import routes from './routes';
import session from 'express-session';
import passport from 'passport';
import { LocalStrategy, JwtStrategy } from '@utils/strategies';

const app = express();

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'superkey',
    resave: false,
    saveUninitialized: true,
    
  })
);


passport.use('jwt', JwtStrategy);

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, JSON.stringify(user));
});

passport.deserializeUser((user, done) => {
  done(null, JSON.parse(user));
});

app.use(passport.initialize());

app.use(passport.session());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
  })
);

app.get('/', (req, res) => {
  res.send('hi, estas en el inicio');
});
app.use('/', routes);

export default app;
