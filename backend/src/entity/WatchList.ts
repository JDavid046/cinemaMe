import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Users } from './Users';

@Entity()
export class WatchList{
    
    /**@PrimaryGeneratedColumn()
    id: number;**/

    @ManyToOne(() => Users, user => user.id, {
        primary: true        
    })    
    user: Users;        
    

    @Column({length: 50, primary: true})
    @MaxLength(50)
    @IsNotEmpty()
    filmId: string;

    @Column({type: 'date', 
        nullable: true,
        default: null })
    fechaInicio: string;

    @Column({type: 'date',
        nullable: true,
        default: null })
    fechaFin: string;

    @Column({ nullable: true, default: null })
    @MaxLength(2)  
    temporadaActual: number;      


    @Column({length: 10, primary:true})
    @MaxLength(10)
    @IsNotEmpty()
    estadoFilm: string; 

}