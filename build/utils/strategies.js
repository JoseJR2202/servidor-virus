"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.JwtStrategy = exports.LocalStrategy = void 0;
const session_1 = require("@helpers/session");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const jwt_simple_1 = require("jwt-simple");
const LocalStrategy = new passport_local_1.Strategy({
    usernameField: 'nombre',
    passwordField: 'contrasenia',
}, async (nombre, contrasenia, done) => {
    try {
        const user = await session_1.getUserByEmail(nombre);
        console.log(user);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    }
    catch (e) {
        console.log(e);
        return done(null, false);
    }
});
exports.LocalStrategy = LocalStrategy;
const optJwt = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'tienda_moviles',
};
const JwtStrategy = new passport_jwt_1.Strategy(optJwt, async (payload, done) => {
    return done(null, payload.sub);
});
exports.JwtStrategy = JwtStrategy;
const generateToken = (user) => {
    const timestamp = new Date().getTime();
    return jwt_simple_1.encode({ sub: user, iat: timestamp }, process.env.JWT_SECRET || 'tienda_moviles');
};
exports.generateToken = generateToken;
//# sourceMappingURL=strategies.js.map