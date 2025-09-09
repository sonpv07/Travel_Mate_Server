import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('destinations')
export class Destination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  season: string;

  @Column()
  budget: number;
}
