import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
