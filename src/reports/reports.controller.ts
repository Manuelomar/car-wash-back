import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiStandardResponse } from '../common/dto/standard-response.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {

    @Get('daily')
    @ApiOperation({ summary: 'Get the daily sales report' })
    @ApiStandardResponse(200, null, 'Daily report returned successfully')
    daily() {
        return 'This action returns the daily report';
    }

    @Get('monthly')
    @ApiOperation({ summary: 'Get the monthly sales report' })
    @ApiStandardResponse(200, null, 'Monthly report returned successfully')
    monthly() {
        return 'This action returns the monthly report';
    }

    @Get('by-service')
    @ApiOperation({ summary: 'Get sales report grouped by service' })
    @ApiStandardResponse(200, null, 'Report by service returned successfully')
    byService() {
        return 'This action returns the report by service';
    }

    @Get('by-employee')
    @ApiOperation({ summary: 'Get sales report grouped by employee' })
    @ApiStandardResponse(200, null, 'Report by employee returned successfully')
    byEmployee() {
        return 'This action returns the report by employee';
    }
}
