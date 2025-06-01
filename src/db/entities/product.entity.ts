import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Manufacturer } from './manufacturer.entity';
import { Review } from './review.entity';

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

  @Column()
  ManufacturerID: number;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'CategoryID' })
  category: Category;

  @ManyToOne(() => Manufacturer, manufacturer => manufacturer.products)
  @JoinColumn({ name: 'ManufacturerID' })
  manufacturer: Manufacturer;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];
}
