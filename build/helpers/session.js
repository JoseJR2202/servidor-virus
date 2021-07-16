"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.comparePassword = exports.signUpUser = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const bcryptjs_1 = require("bcryptjs");
const pool = pool_1.default.getInstance();
const signUpUser = async function (nombre) {
    console.log(nombre);
    const client = await pool.connect();
    try {
        console.log("hola");
        await client.query('BEGIN');
        const response = (await client.query(queries_1.queries.SIGN_UP_USER, [nombre])).rows[0];
        const user = {
            nombre: response.nombre,
            id: response.id_usuario
        };
        await client.query('COMMIT');
        return user;
    }
    catch (e) {
        await client.query('ROLLBACK');
        throw e;
    }
    finally {
        client.release();
    }
};
exports.signUpUser = signUpUser;
const comparePassword = (candidate, hash) => {
    return new Promise((res, rej) => {
        bcryptjs_1.compare(candidate, hash, (err, isMatch) => {
            if (err)
                rej(err);
            res(isMatch);
        });
    });
};
exports.comparePassword = comparePassword;
const getUserByEmail = async (nombre) => {
    const client = await pool.connect();
    try {
        const response = (await client.query(queries_1.queries.GET_USER_BY_NOMBRE, [nombre])).rows[0];
        const users = {
            nombre: response.nombre,
            id: response.id_usuario
        };
        return users;
    }
    catch (e) {
        throw e;
    }
    finally {
        client.release();
    }
};
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=session.js.map