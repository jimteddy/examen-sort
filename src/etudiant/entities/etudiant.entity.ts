import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Etudiant {

  @PrimaryGeneratedColumn()
  readonly id : number

  @Column({ type: "varchar"})
  readonly noms : string;
  
  @Column({ type: "varchar"})
  readonly prenoms : string;

  @Column({type: 'char'})
  readonly sexe : string;

  @Column({ type: 'float'})
  readonly moyenne : number;

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;
}
