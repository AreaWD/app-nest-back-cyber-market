import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Role } from './db/entities/role.entity';
import { UserProfile } from './db/entities/user-profile.entity';
import { Category } from './db/entities/category.entity';
import { Product } from './db/entities/product.entity';
import { PaymentStatus } from './db/entities/payment-status.entity';
import { Order } from './db/entities/order.entity';
import { OrderItem } from './db/entities/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: configService.getOrThrow<number>('DB_PORT'),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_DATABASE'),
        entities: ['./dist/db/entities/*.{ts,js}', Role, UserProfile, Category, Product, PaymentStatus, Order, OrderItem],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule
  ]
})
export class AppModule {}
