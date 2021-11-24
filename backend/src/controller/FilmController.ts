import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import { validate } from 'class-validator';
import { Film } from '../entity/Film';

class FilmController{

    static newFilm = async (req: Request, res: Response) => {
        const { nombreFilm, userId, categoria, anioEstreno, cantidadTemporadas, estadoFilm} = req.body;
        const film = new Film(); 
        console.log(cantidadTemporadas);         

        film.nombreFilm = nombreFilm;
        film.user = userId;
        film.categoria = categoria;
        film.anioEstreno = anioEstreno;
        film.cantidadTemporadas = (cantidadTemporadas === undefined)? "0": cantidadTemporadas;        
        film.estadoFilm = estadoFilm;

        // Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(film, validationOpt);
        if (errors.length > 0) {
        return res.status(400).json(errors);
        }

        const filmRepository = getRepository(Film);
        try {        
            await filmRepository.save(film);
        } catch (e) {
            return res.status(409).json({ message: `Something went wrong. Reason:  ${e}` });
        }
        // All ok
        res.send('Film created');
    };

    static changeStateFilm = async (req: Request, res: Response) => {
        const { id } = req.params;
        const filmRepository = getRepository(Film);

        try {
            const film = await filmRepository.findOneOrFail({relations: ["user"], where: {id: id}});
            res.send(film);
        } catch (error) {
            res.status(404).json({ message: `Not result. Error:  ${error}` });
        }

    };
}

export default FilmController;