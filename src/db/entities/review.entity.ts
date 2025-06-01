import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  ReviewID: number;

  @Column()
  ProductID: number;

  @Column()
  UserID: number;

  @Column()
  Rating: number;

  @Column('text')
  Comment: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @ManyToOne(() => Product, product => product.reviews)
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
