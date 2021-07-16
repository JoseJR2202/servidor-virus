import { Router } from 'express';
import multer from 'multer';
import multerconfig from '@config/multer'
import { archivos } from '@interfaces/archivo';
import { insertArchivos } from '@helpers/file';

const uploads= multer(multerconfig);

const router = Router();

router.post('/',uploads.single('image'), async(req, res)=>{
    const filename=req.file?.filename;
    console.log(filename, 'hola', req.body)
    const archivo: archivos= await insertArchivos({
        id_archivo:req.file?.filename,
        nombre:req.file?.originalname,
        id_usuario:req.body.id
    })
    res.status(200).json({ status: 200, usuario: archivo, message: 'archivo recibido' });
})

export default router;