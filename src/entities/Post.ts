import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id : string

  @Column({type: "text"})
  content: string

  @Column({type: "timestamp"})
  date: string

  @ManyToOne(() =>  User, user => user.posts)
  user: User
}