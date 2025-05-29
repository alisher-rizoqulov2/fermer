import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class CattleHealth {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cattle, (cattle) => cattle.healthRecords)
  @JoinColumn({ name: "cattle_id" })
  cattle: Cattle;

  @Column({ type: "date" })
  checkupDate: Date;

  @Column()
  healthStatus: string;

  @Column()
  treatment: string;

  @Column()
  vetNotes: string;
}
