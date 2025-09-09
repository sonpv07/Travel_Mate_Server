import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { UserRoleEnum } from '../enums/user.enum';
import { Trip } from 'src/models/trips/entities/trip.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Trip, (trip) => trip.user)
  trips: Trip[];
}
