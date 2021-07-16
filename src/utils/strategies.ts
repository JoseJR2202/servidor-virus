import { getUserByEmail, comparePassword } from '@helpers/session';
import { Usuario } from '@interfaces/usuario';
import { Strategy } from 'passport-local';
import { Strategy as JWT, ExtractJwt } from 'passport-jwt';
import { encode } from 'jwt-simple';

const LocalStrategy = new Strategy(
  {
    usernameField: 'nombre',
    passwordField: 'contrasenia',
  },
  async (nombre,contrasenia, done) => {
    try {
      const user:Usuario = await getUserByEmail(nombre);
      console.log(user)
      if (!user) {
        return done(null, false);
      }

    return done(null, user);
    } catch (e) {
      console.log(e)
      return done(null, false);
    }
  }
);

const optJwt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'tienda_moviles',
};

const JwtStrategy = new JWT(optJwt, async (payload, done) => {
  return done(null, payload.sub);
});

const generateToken = (user: any) => {
  const timestamp = new Date().getTime();
  return encode({ sub: user, iat: timestamp }, process.env.JWT_SECRET || 'tienda_moviles');
};

export { LocalStrategy, JwtStrategy, generateToken };
