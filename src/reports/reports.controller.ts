import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { ApiStandardResponse } from '../common/dto/standard-response.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('daily')
    @ApiOperation({ summary: 'Get the daily sales report' })
    @ApiStandardResponse(200, null, 'Daily report returned successfully')
    daily() {
        return this.reportsService.getDailyReport();
    }

    @Get('monthly')
    @ApiOperation({ summary: 'Get the monthly sales report' })
    @ApiStandardResponse(200, null, 'Monthly report returned successfully')
    monthly() {
        return this.reportsService.getMonthlyReport();
    }

    @Get('by-service')
    @ApiOperation({ summary: 'Get sales report grouped by service' })
    @ApiStandardResponse(200, null, 'Report by service returned successfully')
    byService() {
        return this.reportsService.getReportByService();
    }

    @Get('by-employee')
    @ApiOperation({ summary: 'Get sales report grouped by employee' })
    @ApiStandardResponse(200, null, 'Report by employee returned successfully')
    byEmployee() {
        return this.reportsService.getReportByEmployee();
    }
}
