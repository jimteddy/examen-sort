import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Exclude } from 'class-transformer'
import { Examen } from "src/examen/entities/examen.entity";
import { Classe } from "src/classe/entities/classe.entity";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import { Filiere } from "src/filiere/entities/filiere.entity";
import { Matter } from "src/matter/entities/matter.entity";
import { Salle } from "src/salle/entities/salle.entity";
import { Note } from "src/note/entities/note.entity";

@Entity({name: "client"})
export class Client {

  @PrimaryGeneratedColumn()
  readonly id : number;

  @Column()
  @Exclude()
  readonly password : string;

  @Column()
  readonly username : string;
  
  @Column({ unique: true})
  readonly email : string;
  
  @Column({ nullable: true})
  readonly adresse : string;

  @OneToMany(() => Classe, (classe)=> classe.client)
  classes: Classe[]

  @OneToMany(() => Salle, (salle)=> salle.client)
  salles: Salle[]

  @OneToMany(()=>Examen, (examen) => examen.client)
  examens : Examen[]

  @OneToMany(()=>Etudiant, (etudiant) => etudiant.client)
  etudiants : Etudiant[]

  @OneToMany(()=>Filiere, (filiere) => filiere.client)
  filieres : Filiere[]

  @OneToMany(()=>Matter, (matter) => matter.client)
  matters : Matter[]

  @OneToMany(()=>Note, (note) => note.client)
  notes : Note[]


}
