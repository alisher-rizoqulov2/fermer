import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class CattleProfitLoss {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cattle, (cattle) => cattle.profitLossRecords)
  @JoinColumn({ name: "cattle_id" })
  cattle: Cattle;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  totalExpense: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  salePrice: number;

  @Column({ type: "decimal", precision: 14, scale: 2 })
  profit: number;

  @Column({ type: "date" })
  calculatedDate: Date;
}
