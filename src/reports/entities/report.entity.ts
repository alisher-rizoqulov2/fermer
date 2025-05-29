import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reportType: string;

  @Column()
  description: string;

  @Column({ type: "date" })
  generatedDate: Date;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  totalIncome: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  totalExpense: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  netProfit: number;
}
