import { Classe } from "src/classe/entities/classe.entity";
import { Client } from "src/client/entities/client.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Etudiant {

  @PrimaryGeneratedColumn()
  readonly id : number

  @Column({ type: "varchar"})
  readonly noms : string;
  
  @Column({ type: "varchar"})
  readonly prenoms : string;

  @Column({type: 'char', nullable: true})
  readonly sexe : string;

  @Column({type: 'varchar', nullable: true})
  readonly lieuNaissance : string;
  
  @Column({type: 'date', nullable: true})
  readonly dateNaissance : Date;

  @Column({ type: 'float', default: 0, nullable: true})
  readonly moyenne : number;

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @ManyToOne(() => Classe, (classe) => classe.etudiants)
  classe: Classe

  @ManyToOne(() => Client, (client) => client.etudiants)
  client : Client;
}
