import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'posts'})
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text"})
  description: string

  @Column({default: new Date()})
  createAt: Date

  @ManyToOne(() => User, (user) => user.posts )
  user: User;
}
