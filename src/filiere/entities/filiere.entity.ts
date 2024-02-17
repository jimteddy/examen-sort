
import { Client } from "src/client/entities/client.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn, ManyToOne } from "typeorm";


@Entity()
export class Filiere {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  readonly id : number;  

  @Column({})
  readonly libelle : string;    
 
  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @ManyToOne(() => Client, (client) => client.filieres, {
    nullable: false
  })
  client : Client;
}