"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertArchivos = void 0;
const pool_1 = __importDefault(require("@utils/pool"));
const queries_1 = require("@utils/queries");
const pool = pool_1.default.getInstance();
const insertArchivos = async (archivo) => {
    const { id_archivo, nombre, id_usuario } = archivo;
    const client = await pool.connect();
    try {
        console.log("hola");
        await client.query('BEGIN');
        const response = (await client.query(queries_1.archivosQueries.INSERT_ARCHIVO, [id_archivo, nombre, id_usuario])).rows[0];
        const user = {
            id_archivo: response.id_archivos,
            nombre: response.nombre,
            id_usuario: response.id_usuario
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
exports.insertArchivos = insertArchivos;
//# sourceMappingURL=file.js.map