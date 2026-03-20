import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Service } from '../../services/entities/service.entity';
import { Extra } from '../../extras/entities/extra.entity';

export enum TicketStatus {
    QUEUED = 'Queued',
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
}

@Entity('tickets')
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ticketNumber: string;

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

    @ManyToMany(() => Service)
    @JoinTable({ name: 'ticket_services' })
    services: Service[];

    @ManyToMany(() => Extra)
    @JoinTable({ name: 'ticket_extras' })
    extras: Extra[];

    @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.QUEUED })
    status: TicketStatus;

    @Column({ default: 0 })
    position: number;

    @Column({ nullable: true, type: 'uuid' })
    orderId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
