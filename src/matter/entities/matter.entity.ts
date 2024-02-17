import { Client } from "src/client/entities/client.entity";
import { Note } from "src/note/entities/note.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Matter {

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly libelle : string;

  @Column({ type: 'integer'})
  readonly coefficient : number;

  @Column({default : true })
  readonly isActive : boolean

  @CreateDateColumn()
  readonly createAt : Date;

  @UpdateDateColumn()
  readonly updateAt : Date;

  @OneToMany(()=>Note, (note) => note.client)
  notes : Note[]

  @ManyToOne(() => Client, (client) => client.matters, {
    nullable: false, cascade: true
  })
  client : Client;
}


