import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp with time zone", name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone", name: "updated_at" })
  updatedAt: Date;
}
