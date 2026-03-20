import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    unit: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    stock: number;

    @Column({ nullable: true })
    minStock: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    unitCost: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
