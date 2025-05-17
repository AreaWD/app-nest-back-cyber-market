import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { UserProfile } from '../../db/entities/user-profile.entity';
import { Category } from '../../db/entities/category.entity';
import { Product } from '../../db/entities/product.entity';
import { PaymentStatus } from '../../db/entities/payment-status.entity';
import { Order } from '../../db/entities/order.entity';
import { OrderItem } from '../../db/entities/order-item.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RoleService } from './role.service';
import { Role } from '../../db/entities/role.entity';

@Module({
  imports: [
TypeOrmModule.forFeature([User, UserProfile, Category, Product, PaymentStatus, Order, OrderItem, Role]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY_JWT'),
        signOptions: { expiresIn: '30d' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RoleService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly roleService: RoleService) {}

  async onModuleInit() {
    await this.roleService.seedRoles();
  }
}
