import { Column, Entity, IsNull, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Compte } from 'src/compte/entities/compte.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity({ name: "users"})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar'})
  nom : string; 

  @Column({ nullable: true, })
  prenom : string;

  @Column({ unique: true, nullable: true, })
  telephone : string;

  @Column({ nullable: true })
  birthday? : Date;

  @Column({ unique: true, nullable: true})
  email : string;

  @Column( )
  password : string;

  @Column({ nullable: true})
  ville : string;

  @Column({ default: new Date()})
  createAt: Date;

  @Column({ default: true})
  isActive : boolean;

  @OneToOne(() => Compte)
  @JoinColumn({name: 'compte', referencedColumnName: "id", foreignKeyConstraintName: "compte"})
  compte: Compte;
 
  @OneToMany(() => Post, (post) => post.user)
  posts:  Post[];
}
