import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cattle, (cattle) => cattle.expenses)
  cattle: Cattle;

  @Column()
  expenseType: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column()
  notes: string;
}
