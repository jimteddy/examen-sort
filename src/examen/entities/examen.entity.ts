import { Client } from "src/client/entities/client.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Examen {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  readonly id : number;  

  @Column({})
  readonly libelle : string;    

  @Column({nullable: true, type: 'text'})
  readonly description : string;    

  @Column({nullable: true, type:'date'})
  readonly dateDebut : Date;    

  @Column({nullable: true, type:'date'})
  readonly dateFin : Date;    

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @ManyToOne(() => Client, (client) => client.examens)
  client : Client;
}
