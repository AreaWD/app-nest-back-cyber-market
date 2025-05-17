import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  UserProfileID: number;

  @Column()
  UserID: number;

  @Column({ length: 100 })
  FirstName: string;

  @Column({ length: 100 })
  LastName: string;

  @Column({ length: 20 })
  Phone: string;

  @Column('date')
  BirthDate: Date;

  @Column({ length: 10 })
  Gender: string;

  @ManyToOne(() => User, user => user.profile)
  @JoinColumn({ name: 'UserID' })
  user: User;
}
