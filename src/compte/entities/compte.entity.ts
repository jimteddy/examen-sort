import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "comptes"})
export class Compte {
  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ default: 0})
  solde: number;

  @Column({ default: true})
  isActive : boolean;
  
  @Column({ default: new Date()})
  createAt: Date;
}
