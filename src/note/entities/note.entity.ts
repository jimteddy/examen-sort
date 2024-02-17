import { Client } from "src/client/entities/client.entity";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import { Matter } from "src/matter/entities/matter.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "note"})
export class Note {
  @PrimaryGeneratedColumn({type: "bigint"})
  readonly id : number ;
  
  @Column({type: "float"})
  readonly note : number;

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @ManyToOne(() => Matter, (matter) => matter.notes, {
    nullable: false
  })
  readonly matter : Matter;
  
  @ManyToOne(() => Etudiant, (etudiant) => etudiant.notes)
  readonly etudiant : Etudiant;
  
  @ManyToOne(() => Client, (client) => client.notes, {
    nullable: false
  })
  readonly client : Client;

}
