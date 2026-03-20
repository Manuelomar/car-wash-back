import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity('cash_register')
export class CashRegister {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true, type: 'uuid' })
    employeeId: string;

    @ManyToOne(() => Employee, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    openingBalance: number;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    closingBalance: number;

    @Column({ default: 'open' })
    status: string;

    @Column({ nullable: true })
    notes: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    openedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    closedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
