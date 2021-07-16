import Pool from '@utils/pool';
import { archivosQueries } from '@utils/queries';
import { archivos} from '@interfaces/archivo';

const pool = Pool.getInstance();

export const insertArchivos=async(archivo:archivos)=>{
    const {id_archivo, nombre, id_usuario}=archivo
    const client = await pool.connect();
    try {
      console.log("hola")
      await client.query('BEGIN');
      const response = (await client.query(archivosQueries.INSERT_ARCHIVO, [id_archivo,nombre, id_usuario])).rows[0];
      const user: archivos = {
            id_archivo:response.id_archivos,
            nombre:response.nombre,
            id_usuario:response.id_usuario
      };
      await client.query('COMMIT');
      return user;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
}