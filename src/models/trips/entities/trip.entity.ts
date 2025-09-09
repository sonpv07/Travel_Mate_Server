import { Destination } from 'src/models/destinations/entities/destination.entity';
import { User } from 'src/models/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @ManyToMany(() => Destination)
  @JoinTable()
  destinations: Destination[];
}
