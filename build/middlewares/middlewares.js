"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = exports.passportAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passportAuth = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send({
                err: info,
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).send({
                    err: 'Could not log in user',
                });
            }
            res.status(200).send({
                status: 'Login successful!',
            });
        });
    })(req, res, next);
};
exports.passportAuth = passportAuth;
const cors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
};
exports.cors = cors;
//# sourceMappingURL=middlewares.js.map