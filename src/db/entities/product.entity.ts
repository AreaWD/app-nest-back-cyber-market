import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  ProductID: number;

  @Column({ length: 255 })
  Name: string;

  @Column('text')
  Description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Price: number;

  @Column()
  Stock: number;

  @Column()
  CategoryID: number;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'CategoryID' })
  category: Category;
}
