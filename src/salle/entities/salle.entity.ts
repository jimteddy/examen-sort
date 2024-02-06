import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Timestamp, UpdateDateColumn } from "typeorm";


@Entity()
export class Salle {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  readonly id : number;  

  @Column({})
  readonly name : string;    

  @Column({ default: 0 })
  readonly capacity : number;

  @Column({ default: false})
  readonly isFavorite : boolean;    


  @CreateDateColumn()
  readonly createAt : Timestamp;

  @UpdateDateColumn()
  readonly updateAt : Timestamp;
}
