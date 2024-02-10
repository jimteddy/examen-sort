import { Client } from "src/client/entities/client.entity";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";


@Entity()
export class Classe {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  readonly id : number;  

  @Column({})
  readonly name : string;    

  @Column({nullable: true })
  readonly periode : string;    

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @OneToMany(() => Etudiant, (etudiant)=> etudiant.classe)
  etudiants: Etudiant[]

  @ManyToOne(() => Client, (client) => client.classes)
  client : Client;

}
