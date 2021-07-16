"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.archivosQueries = exports.queries = void 0;
exports.queries = {
    GET_USERS: `SELECT * FROM usuario`,
    GET_USER_BY_ID: `SELECT * FROM usuario WHERE id_usuario = $1`,
    GET_USER_BY_NOMBRE: `SELECT * FROM usuario WHERE nombre = $1`,
    SIGN_UP_USER: `INSERT INTO usuario (nombre) VALUES ($1) RETURNING *`,
};
exports.archivosQueries = {
    GET_ARCHIVO: `SELECT * FROM archivos where id_usuario = $1 `,
    INSERT_ARCHIVO: `INSERT INTO archivos ( id_archivos, nombre, id_usuario) values ($1,$2,$3) RETURNING *`,
};
//# sourceMappingURL=queries.js.map