import { Expose } from "class-transformer";
import { Classe } from "src/classe/entities/classe.entity";
import { Client } from "src/client/entities/client.entity";
import { Note } from "src/note/entities/note.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

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

  @ManyToOne(() => Classe, (classe) => classe.etudiants, {
    nullable: false
  })
  classe: Classe

  @ManyToOne(() => Client, (client) => client.etudiants, {
    nullable: false
  })
  client : Client;

  @OneToMany(()=>Note, (note) => note.etudiant)
  notes : Note[]

  @Expose()
  get fullName(): string {
    return `${this.noms} ${this.prenoms}`; 
  }
  
}
