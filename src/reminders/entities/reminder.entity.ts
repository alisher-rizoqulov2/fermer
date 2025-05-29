import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cattle, (cattle) => cattle.reminders)
  cattle: Cattle;

  @Column()
  reminderText: string;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  isDone: boolean;
}
