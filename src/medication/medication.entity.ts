import { Drone } from 'src/drone/drone.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Medication {
  @Column({ unique: true, primary: true })
  code: string;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  imageURL: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => Drone, drone => drone.medications)
  drone: Drone;
}
