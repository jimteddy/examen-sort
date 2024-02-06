import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer'
import { Examen } from "src/examen/entities/examen.entity";

@Entity({name: "client"})
export class Client {
  @PrimaryGeneratedColumn()
  readonly id : number;

  @Column()
  readonly username : string;

  @Column({ unique: true})
  readonly email : string;

  @Column()
  @Exclude()
  readonly password : string;

  @OneToMany(()=>Examen, (examen) => examen.client)
  examens : Examen[]

}
