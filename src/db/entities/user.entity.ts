import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => UserProfile, profile => profile.user)
  profile: UserProfile;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
