import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';
import FilmController from '../controller/FilmController';

const router = Router();

/**
 * Operations on Users
 */

// Get all users
router.get('/', UserController.getAll);

// Get one user
router.get('/:id', [checkJwt], UserController.getById);

// Create a new user
router.post('/', UserController.new);

// Edit user
router.patch('/:id', [checkJwt], UserController.edit);

// Delete
router.delete('/:id', UserController.delete);


/**
 * Operations on Films
 */

// Create a new Film
router.post('/film/', FilmController.newFilm);

// Get one user
router.get('/film/:id', FilmController.changeStateFilm);

export default router;
