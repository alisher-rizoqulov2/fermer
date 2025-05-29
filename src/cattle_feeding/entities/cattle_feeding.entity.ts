import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Cattle } from "../../cattle/entities/cattle.entity";

@Entity()
export class CattleFeeding {
  @ApiProperty({
    example: 1,
    description: "Yemlanish yozuvining unikal identifikatori (ID)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Yem olayotgan mol (Cattle) obyektiga bog‘lanish",
    type: () => Cattle,
  })
  @ManyToOne(() => Cattle, (cattle) => cattle.feedings, { onDelete: "CASCADE" })
  cattle: Cattle;

  @ApiProperty({
    example: "silo",
    description: "Yem turi (masalan: silo, somon, aralash yem)",
  })
  @Column()
  feed_type: string;

  @ApiProperty({
    example: 15.5,
    description: "Yem miqdori (kilogrammda), decimal qiymat bo‘lishi mumkin",
  })
  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({
    example: "2025-05-27",
    description: "Yem berilgan sana (ISO formatda: YYYY-MM-DD)",
  })
  @Column("date")
  date: string;

  @ApiProperty({
    required: false,
    example: "Kuniga ikki mahal beriladi",
    description: "Qo‘shimcha izoh yoki eslatmalar (ixtiyoriy)",
  })
  @Column("text", { nullable: true })
  notes?: string;
}
