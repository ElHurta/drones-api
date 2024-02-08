import { Medication } from 'src/medication/medication.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Drone {
  @Column({ unique: true, primary: true, length: 100 })
  serialNumber: string;

  @Column()
  model: string;

  @Column()
  weightLimit: number;

  @Column()
  batteryCapacity: number;

  @Column()
  state: string;

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

  @OneToMany(() => Medication, (medication) => medication.drone)
  medications: Medication[];
}
