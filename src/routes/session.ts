import { Router } from 'express';
import { isLogged, isAuth } from '@validations/auth';
import { signUpUser } from '@helpers/session';
import { authenticate } from 'passport';
import { generateToken } from '@utils/strategies';
import { passportAuth } from '@middlewares/middlewares';
import { signUpFieldsValidation, loginFieldsValidation, checkResult } from '@validations/fields';

const router = Router();

router.get('/', (req, res) => {
  res.send('Aqui estan las cosas de login');
});

router.get('/logout', (req: any, res) => {
  req.logout();
  req.session.alias=null;
  res.json({ status: 200, message: 'Sesión finalizada.' });
});

router.post('/signup', /* signUpFieldsValidation, checkResult, */ async (req, res) => {
  try {
    console.log(req.body.nombre);
    const data = await signUpUser(req.body.nombre);
    res.status(200).json({ id: data.id });
  } catch (e) {
    res.status(500).json({ status: 500, error: e, message: 'Error al registrar un usuario' });
  }
});

router.post('/user', isLogged, loginFieldsValidation, checkResult, authenticate('local'), async (req: any, res) => {
  res.status(200).json({
    id:req.user.id
  });
});

export default router;
