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
        res.send({message: 'WatchList created'});
    };

    static getAllUserWatchList = async (req: Request, res: Response) => {
        const { id } = req.params;        
        const watchListRepository = getRepository(WatchList);

        try {
            const watchList = await watchListRepository.find({where: {user: id}});            
            res.send(watchList);
        } catch (error) {
            res.status(404).json({ message: 'Not result.' });
        }

    };

    static getFilmbyUser = async (req: Request, res: Response) => {
        const { filmId, userId } = req.params;        
        const watchListRepository = getRepository(WatchList);

        try {
            const watchList = await watchListRepository.findOneOrFail({where: {filmId: filmId ,user: userId}});               
            res.send(true);
        } catch (error) {
            res.send(false);
            //res.status(404).json({ message: 'Not result.' });
        }
    };

    static getFilmByStatus = async (req: Request, res: Response) => {
        const { status, userId } = req.params;             
        let theStatus;

        switch (status) {
            case "towatch":
                theStatus = "To Watch";
                break;

            case "ongoing":
                theStatus = "On Going";
                break; 
                
            case "finalized":
                theStatus = "Finalized";
                break;     
        }
        
        const watchListRepository = getRepository(WatchList);

        try {
            const watchList = await watchListRepository.find({where: {estadoFilm:theStatus, user: userId}});               
            res.send(watchList);
        } catch (error) {            
            res.status(404).json({ message: 'Not result.' });
        }

    };

    static updateStateUserWatchList = async (req: Request, res: Response) => {
        let user;
        let watchList;
        const { userId, filmId } =req.params;
        const { status } = req.body;

        const watchListRepository = getRepository(WatchList);
        const userRepository = getRepository(Users);
        
        try {
          watchList = await watchListRepository.findOneOrFail({where: {filmId: filmId, user: userId}});
          user = await userRepository.findOneOrFail(userId);

          /*watchList.user = user;
          watchList.filmId = filmId;*/

          let theDate = new Date();        
          
          switch (status) {
                case "En Curso":                          
                    watchList.fechaInicio = theDate.toISOString().split('T')[0];  
                    watchList.estadoFilm = status;
                    watchList.temporadaActual = "0";
                    break;

                case "Finalizado":
                    watchList.fechaFin = theDate.toISOString().split('T')[0];  
                    watchList.temporadaActual = "0";
                    watchList.estadoFilm = status;
                    break;          
          
                default:
                    break;
          }
    
        } catch (e) {
          return res.status(404).json({ message: 'WatchList not found' });
        }
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(watchList, validationOpt);
    
        if (errors.length > 0) {
          return res.status(400).json(errors);
        }
    
        // Try to save watchlist
        try {
          await watchListRepository.update({filmId, user}, watchList);
        } catch (e) {
          return res.status(409).json({ message:`Something went wrong. Error: ${e}` });
        }
    
        res.status(201).json({ message: 'WatchList Updated' });       
    };
}

export default WatchListController;