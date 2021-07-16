"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkResult = exports.commentsValidation = exports.loginFieldsValidation = exports.updateUserFieldsValidation = exports.signUpFieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.signUpFieldsValidation = [
    express_validator_2.check('alias').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({ min: 4 }).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta descripcion').isString().isLength({ min: 10 }).withMessage('Descripcion invalida, la descripcion debe de ser de almenos 10 caracteres'),
    express_validator_2.check('contrasenia').notEmpty({ ignore_whitespace: true }).withMessage('Falta una contraseña').isLength({ min: 4, max: 20 }).withMessage('Contrasenia invalida, debe tener una longitud de 4 a 20 caracteres'),
];
exports.updateUserFieldsValidation = [
    express_validator_2.check('alias').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario un alias').isString().isLength({ min: 4 }).withMessage('Alias invalido, de tener por lo menos 4 caracteres'),
    express_validator_2.check('correo').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isEmail().withMessage('Correo invalido'),
    express_validator_2.check('descripcion').notEmpty({ ignore_whitespace: true }).withMessage('Falta descripcion').isString().isLength({ min: 10 }).withMessage('Descripcion invalida, la descripcion debe de ser de almenos 10 caracteres'),
];
exports.loginFieldsValidation = [
    express_validator_2.check('nombre').notEmpty({ ignore_whitespace: true }).withMessage('Falta un correo').isString().withMessage('Correo invalido'),
];
exports.commentsValidation = [
    express_validator_2.check('contenido').notEmpty({ ignore_whitespace: true }).withMessage('Debe incluir un comentario para su critica').isString().isLength({ min: 10 }).withMessage('Contenido invalido'),
    express_validator_2.check('puntuacion').notEmpty({ ignore_whitespace: true }).withMessage('Debe incluir una puntuacion').isNumeric().withMessage("puntuacion invalida")
];
const checkResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: 400,
            message: 'Error en datos enviados',
            error: errors.array()[0],
        });
    }
    else {
        next();
    }
};
exports.checkResult = checkResult;
//# sourceMappingURL=fields.js.map