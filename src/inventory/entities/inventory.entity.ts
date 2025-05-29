import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: "date" })
  addedDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
