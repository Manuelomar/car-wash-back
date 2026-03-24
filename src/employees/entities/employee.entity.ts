import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: '' })
    fullName: string;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    role: string;

    @Column({ default: true })
    active: boolean;

    @Column({ nullable: true })
    commissionType: string;

    @Column('decimal', { precision: 10, scale: 2, nullable: true })
    commissionValue: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
