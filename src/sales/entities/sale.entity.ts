import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cattle, (cattle) => cattle.sales)
  cattle: Cattle;

  @Column()
  saleDate: Date;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  salePrice: number;

  @Column()
  buyerInfo: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  profit: number;
}
