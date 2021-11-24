import { Entity, PrimaryGeneratedColumn, Unique, Column } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 90})
  @MaxLength(90)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Column({length: 50})
  @MaxLength(50)
  @IsNotEmpty()
  nombre: string;

  @Column({length: 50})
  @MaxLength(50)
  @IsNotEmpty()
  apellido: string;

  @Column({type: 'date'})
  @IsNotEmpty()
  fechaNacimiento: string;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
