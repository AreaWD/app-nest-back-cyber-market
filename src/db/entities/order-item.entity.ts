import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  OrderItemID: number;

  @Column()
  OrderID: number;

  @Column()
  ProductID: number;

  @Column()
  Quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'ProductID' })
  product: Product;
}
