import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Service } from '../../services/entities/service.entity';
import { Extra } from '../../extras/entities/extra.entity';
import { Employee } from '../../employees/entities/employee.entity';

export enum OrderStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    customerId: string;

    @ManyToOne(() => Customer, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'customerId' })
    customer: Customer;

    @Column('uuid')
    vehicleId: string;

    @ManyToOne(() => Vehicle, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle;

    @Column('uuid')
    serviceId: string;

    @ManyToOne(() => Service, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'serviceId' })
    service: Service;

    @ManyToMany(() => Extra)
    @JoinTable({ name: 'order_extras' })
    extras: Extra[];

    @Column({ nullable: true, type: 'uuid' })
    employeeId: string;

    @ManyToOne(() => Employee, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
