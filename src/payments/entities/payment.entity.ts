import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    orderId: string;

    @Column()
    orderCode: string;

    @Column()
    method: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    reference: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    paidAt: Date;

    @Column()
    cashierId: string;

    @Column()
    cashierName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
