import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';
import WatchListController from '../controller/WatchListController';

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
 * Operations on WatchLists
 */

// Create a new WatchList
router.post('/film/', WatchListController.newFilm);

// Get WatchLists by UserId
router.get('/film/:id', WatchListController.getAllUserWatchList);

// Update 1 User's WatchList
router.patch('/film/:userId/:filmId', WatchListController.updateUserWatchList);

export default router;
