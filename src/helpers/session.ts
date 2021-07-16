import Pool from '@utils/pool';
import { queries } from '@utils/queries';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { Usuario } from '@interfaces/usuario';

const pool = Pool.getInstance();

export const signUpUser = async function (nombre:string) {
  console.log(nombre)

  const client = await pool.connect();
  try {
    console.log("hola")
    await client.query('BEGIN');
    const response = (await client.query(queries.SIGN_UP_USER, [nombre])).rows[0];
    const user: Usuario = {
      nombre:response.nombre,
      id:response.id_usuario
    };
    await client.query('COMMIT');
    return user;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};

export const comparePassword = (candidate, hash) => {
  return new Promise((res, rej) => {
    compare(candidate, hash, (err, isMatch) => {
      if (err) rej(err);
      res(isMatch);
    });
  });
};

export const getUserByEmail = async (nombre: string): Promise<Usuario> => {
  const client = await pool.connect();

  try {
    const response = (await client.query(queries.GET_USER_BY_NOMBRE, [nombre])).rows[0];
    const users: Usuario= {
      nombre:response.nombre,
      id:response.id_usuario
    }

    return users;
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};
