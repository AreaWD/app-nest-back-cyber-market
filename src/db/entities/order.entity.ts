import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { PaymentStatus } from './payment-status.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  OrderID: number;

  @Column()
  UserID: number;

  @Column('timestamp')
  OrderDate: Date;

  @Column()
  StatusID: number;

  @Column('decimal', { precision: 10, scale: 2 })
  TotalAmount: number;

  @Column('text')
  ShippingAddress: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => PaymentStatus)
  @JoinColumn({ name: 'StatusID' })
  status: PaymentStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems: OrderItem[];
}
