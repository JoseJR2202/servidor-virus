export const queries = {
  GET_USERS: `SELECT * FROM usuario`,
  GET_USER_BY_ID: `SELECT * FROM usuario WHERE id_usuario = $1`,
  GET_USER_BY_NOMBRE: `SELECT * FROM usuario WHERE nombre = $1`,
  SIGN_UP_USER: `INSERT INTO usuario (nombre) VALUES ($1) RETURNING *`,
};

export const archivosQueries={
  GET_ARCHIVO:`SELECT * FROM archivos where id_usuario = $1 `,
  INSERT_ARCHIVO:`INSERT INTO archivos ( id_archivos, nombre, id_usuario) values ($1,$2,$3) RETURNING *`,
 };

