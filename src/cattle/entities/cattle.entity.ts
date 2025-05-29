import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { CattleFeeding } from "../../cattle_feeding/entities/cattle_feeding.entity";
import { CattleHealth } from "../../cattle_health/entities/cattle_health.entity";
import { Sale } from "../../sales/entities/sale.entity";
import { Expense } from "../../expenses/entities/expense.entity";
import { Reminder } from "../../reminders/entities/reminder.entity";
import { CattleProfitLoss } from "../../cattle_profit_loss/entities/cattle_profit_loss.entity";

@Entity()
export class Cattle {
  @ApiProperty({ example: 1, description: "Molning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "UZ-12345",
    description: "Molning tag raqami (unikal)",
  })
  @Column({ unique: true })
  tag_number: string;

  @ApiProperty({ example: "Simmental", description: "Mol zotining nomi" })
  @Column()
  breed: string;

  @ApiProperty({ example: "2022-05-15", description: "Tug‘ilgan sana" })
  @Column({ type: "date" })
  birth_date: string;

  @ApiProperty({ example: "2023-01-10", description: "Sotib olingan sana" })
  @Column({ type: "date", nullable: true })
  purchase_date: string;

  @ApiProperty({ example: 12000000, description: "Sotib olingan narxi (so‘m)" })
  @Column({ type: "decimal", precision: 15, scale: 2, nullable: true })
  purchase_price: number;

  @ApiProperty({
    example: "active",
    description: "Molning holati (active, sold, dead)",
  })
  @Column({ default: "active" })
  status: string;

  @OneToMany(() => CattleFeeding, (feeding) => feeding.cattle)
  feedings: CattleFeeding[];
  @OneToMany(() => CattleHealth, (health) => health.cattle)
  healthRecords: CattleHealth[];

  @OneToMany(() => Sale, (sale) => sale.cattle)
  sales: Sale[];

  @OneToMany(() => Expense, (expense) => expense.cattle)
  expenses: Expense[];

  @OneToMany(() => Reminder, (reminder) => reminder.cattle)
  reminders: Reminder[];

  @OneToMany(() => CattleProfitLoss, (pl) => pl.cattle)
  profitLossRecords: CattleProfitLoss[];

}
