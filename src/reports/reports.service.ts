import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
    ) { }

    async getDailyReport() {
        const start = startOfDay(new Date());
        const end = endOfDay(new Date());

        const orders = await this.orderRepo.find({
            where: { createdAt: Between(start, end) },
            relations: ['service', 'extras']
        });

        const totalSales = orders.reduce((sum, order) => sum + Number(order.total), 0);
        const count = orders.length;

        return {
            date: new Date().toISOString().split('T')[0],
            totalSales,
            orderCount: count,
            orders: orders.map(o => ({
                id: o.id,
                total: o.total,
                status: o.status,
                service: o.service?.name
            }))
        };
    }

    async getMonthlyReport() {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());

        const orders = await this.orderRepo.find({
            where: { createdAt: Between(start, end) }
        });

        const totalSales = orders.reduce((sum, order) => sum + Number(order.total), 0);

        return {
            month: new Date().toLocaleString('default', { month: 'long' }),
            totalSales,
            orderCount: orders.length
        };
    }

    async getReportByService() {
        const result = await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.service', 'service')
            .select('service.name', 'name')
            .addSelect('COUNT(order.id)', 'count')
            .addSelect('SUM(order.total)', 'total')
            .groupBy('service.name')
            .getRawMany();

        return result;
    }

    async getReportByEmployee() {
        const result = await this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.employee', 'employee')
            .select('employee.fullName', 'name')
            .addSelect('COUNT(order.id)', 'count')
            .addSelect('SUM(order.total)', 'total')
            .groupBy('employee.fullName')
            .getRawMany();

        return result;
    }
}
