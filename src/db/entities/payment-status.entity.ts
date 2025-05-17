import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentStatus {
  @PrimaryGeneratedColumn()
  StatusID: number;

  @Column({ length: 50 })
  StatusName: string;
}
