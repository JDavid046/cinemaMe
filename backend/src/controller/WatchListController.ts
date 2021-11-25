import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';
import { WatchList } from '../entity/WatchList';

class WatchListController{

    static newFilm = async (req: Request, res: Response) => {
        const { userId, filmId, temporadaActual, estadoFilm} = req.body;
        const watchList = new WatchList();                
        
        watchList.filmId = filmId;        
        watchList.temporadaActual = (temporadaActual === undefined)? "0": temporadaActual;        
        watchList.estadoFilm = estadoFilm;

        // Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(WatchList, validationOpt);
        if (errors.length > 0) {
        return res.status(400).json(errors);
        }

        const userRepository = getRepository(Users);
        const watxhListRepository = getRepository(WatchList);
        try {        
            const user = await userRepository.findOneOrFail(userId);
            watchList.user = user;
            await watxhListRepository.save(watchList);
        } catch (e) {
            return res.status(409).json({ message: `Something went wrong. Reason:  ${e}` });
        }
        // All ok
        res.send('WatchList created');
    };

    static getAllUserWatchList = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const watchListRepository = getRepository(WatchList);

        try {
            const watchList = await watchListRepository.find({where: {user: id}});            
            res.send(watchList);
        } catch (error) {
            res.status(404).json({ message: `Not result. Error:  ${error}` });
        }

    };

    static updateUserWatchList = async (req: Request, res: Response) => {
        const { userId, filmId } =req.params;
        console.log(`user: ${userId} , film: ${filmId}`);
    };
}

export default WatchListController;