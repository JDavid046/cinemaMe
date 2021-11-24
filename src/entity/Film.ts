import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Users } from './Users';

@Entity()
export class Film{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MaxLength(255)
    @IsNotEmpty()
    nombreFilm: string;

    @OneToOne(type => Users)
    @JoinColumn()
    user: Users;

    @Column({length: 8})
    @MaxLength(8)
    @IsNotEmpty()
    categoria: string;

    @Column()
    @IsNotEmpty()
    @MaxLength(4)
    anioEstreno: number;

    @Column({ nullable: true, default: null })
    @MaxLength(2)  
    cantidadTemporadas: number;

    @Column({type: 'date', 
        nullable: true,
        default: null })
    fechaInicio: string;

    @Column({type: 'date',
        nullable: true,
        default: null })
    fechaFin: string;

    @Column({length: 10})
    @MaxLength(10)
    @IsNotEmpty()
    estadoFilm: string;

}