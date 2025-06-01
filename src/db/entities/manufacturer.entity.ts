import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  ManufacturerID: number;

  @Column({ length: 255, nullable: false })
  Name: string;

  @Column({ length: 100, nullable: true })
  Country: string;

  @Column({ length: 255, nullable: true })
  Website: string;

  @OneToMany(() => Product, product => product.manufacturer)
  products: Product[];
}
