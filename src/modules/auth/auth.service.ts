import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { UserProfile } from '../../db/entities/user-profile.entity';
import { Category } from '../../db/entities/category.entity';
import { Product } from '../../db/entities/product.entity';
import { PaymentStatus } from '../../db/entities/payment-status.entity';
import { Order } from '../../db/entities/order.entity';
import { OrderItem } from '../../db/entities/order-item.entity';
import { Role } from '../../db/entities/role.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepository: Repository<PaymentStatus>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
      select: ['id', 'email', 'password']
    });

    if (!user || !user.password) {
      return null;
    }

    try {
      const passwordIsMatch = await argon2.verify(user.password, password);
      console.log(passwordIsMatch);

      return passwordIsMatch ? user : null;
    } catch {
      throw new UnauthorizedException('User or password are incorrect');
    }
  }

  async login(user: User) {
    return await this.generateJwt(user)
  }

  async generateJwt(user: User) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: {
        id: user.role.id,
        name: user.role.name
      }
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

async register(createUserDto: CreateUserDto, createUserProfileDto: CreateUserProfileDto) {
  const existUser = await this.userRepository.findOne({
    where: {
      email: createUserDto.email
    }
  });

  if (existUser) {
    throw new BadRequestException('this email already exist!');
  }

  const hashedPassword = await argon2.hash(createUserDto.password);
  console.log('Hashed password:', hashedPassword);

  const role = await this.roleRepository.findOne({ where: { id: 2 } });
  if (!role) {
    throw new BadRequestException('Role with id 2 does not exist!');
  }

  const user = await this.userRepository.save({
    email: createUserDto.email,
    password: hashedPassword,
    role: role
  });

  const userProfile = await this.userProfileRepository.save({
    ...createUserProfileDto,
    UserID: user.id
  });

  return { user, userProfile };
}

  async createUserProfile(createUserProfileDto: CreateUserProfileDto) {
    const userProfile = await this.userProfileRepository.save(createUserProfileDto);
    return { userProfile };
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.save(createCategoryDto);
    return { category };
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    return { product };
  }

  async createPaymentStatus(createPaymentStatusDto: CreatePaymentStatusDto) {
    const paymentStatus = await this.paymentStatusRepository.save(createPaymentStatusDto);
    return { paymentStatus };
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.save(createOrderDto);
    return { order };
  }

  async createOrderItem(createOrderItemDto: CreateOrderItemDto) {
    const orderItem = await this.orderItemRepository.save(createOrderItemDto);
    return { orderItem };
  }

  async getUserProfile(userId: number) {
    return await this.userProfileRepository.findOne({ where: { UserID: userId } });
  }

  async getUserRole(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role']
    });
    return user ? user.role : null;
  }
}
