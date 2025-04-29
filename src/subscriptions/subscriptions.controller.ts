import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDTO } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDTO } from './dtos/update-subscription.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  getSubscriptions() {
    return this.subscriptionsService.getSubscriptions();
  }

  @Get(':id')
  getSubscription(@Param('id') id: string) {
    return this.subscriptionsService.getSubscription(id);
  }

  @Post()
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  createSubscription(@Body() data: CreateSubscriptionDTO) {
    return this.subscriptionsService.createSubscription(data);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  deleteSubscription(@Param('id') id: string) {
    return this.subscriptionsService.deleteSubscription(id);
  }

  @Put(':id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles('admin')
  updateSubscription(
    @Param('id') id: string,
    @Body() data: UpdateSubscriptionDTO,
  ) {
    return this.subscriptionsService.updateSubscription(id, data);
  }
}
