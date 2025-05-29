import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class FarmWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  balance: number;

  @Column({ default: "UZS" })
  currency: string;

  @UpdateDateColumn()
  lastUpdated: Date;
}
