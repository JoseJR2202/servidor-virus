"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@validations/auth");
const session_1 = require("@helpers/session");
const passport_1 = require("passport");
const fields_1 = require("@validations/fields");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('Aqui estan las cosas de login');
});
router.get('/logout', (req, res) => {
    req.logout();
    req.session.alias = null;
    res.json({ status: 200, message: 'Sesión finalizada.' });
});
router.post('/signup', /* signUpFieldsValidation, checkResult, */ async (req, res) => {
    try {
        console.log(req.body.nombre);
        const data = await session_1.signUpUser(req.body.nombre);
        res.status(200).json({ id: data.id });
    }
    catch (e) {
        res.status(500).json({ status: 500, error: e, message: 'Error al registrar un usuario' });
    }
});
router.post('/user', auth_1.isLogged, fields_1.loginFieldsValidation, fields_1.checkResult, passport_1.authenticate('local'), async (req, res) => {
    res.status(200).json({
        id: req.user.id
    });
});
exports.default = router;
//# sourceMappingURL=session.js.map