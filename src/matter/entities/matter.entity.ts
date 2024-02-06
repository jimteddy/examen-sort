import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}


