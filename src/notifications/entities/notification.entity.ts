import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/scheam/user.entity";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

}
