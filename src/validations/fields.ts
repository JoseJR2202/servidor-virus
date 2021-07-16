import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const signUpFieldsValidation = [
  check('alias').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({min:4}).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
  check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta descripcion').isString().isLength({min:10}).withMessage('Descripcion invalida, la descripcion debe de ser de almenos 10 caracteres'),
  check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({min:4, max:20}).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
];

export const updateUserFieldsValidation = [
  check('alias').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({min:4}).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
  check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
  check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta descripcion').isString().isLength({min:10}).withMessage('Descripcion invalida, la descripcion debe de ser de almenos 10 caracteres'),
];

export const loginFieldsValidation = [
  check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isString().withMessage('Correo invalido'),
];

export const commentsValidation=[
  check('contenido').notEmpty({ ignore_whitespace: true }).withMessage('Debe incluir un comentario para su critica').isString().isLength({min:10}).withMessage('Contenido invalido'),
  check('puntuacion').notEmpty({ ignore_whitespace: true }).withMessage('Debe incluir una puntuacion').isNumeric().withMessage("puntuacion invalida")
];

export const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: 'Error en datos enviados',
      error: errors.array()[0],
    });
  } else {
    next();
  }
};
