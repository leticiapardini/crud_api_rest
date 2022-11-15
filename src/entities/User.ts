import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id : string

  @Column({type: "text"})
  name: string

  @Column({type: "text"})
  email: string

  @Column({type: "text"})
  password : string

  @OneToMany( () => Post, (post) => post.user)
  posts : Post[]
}