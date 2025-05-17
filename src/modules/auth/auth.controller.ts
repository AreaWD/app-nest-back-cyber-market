import { Controller, Request, Post, UseGuards, Get, UsePipes, ValidationPipe, Body, Req, UnauthorizedException } from '@nestjs/common';
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatePaymentStatusDto } from './dto/create-payment-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход пользователя' })
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }, @Req() req) {
    console.log(loginDto);

    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    req.user = user;
    return this.authService.login(req.user);
  }

@ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto, @Body() createUserProfileDto: CreateUserProfileDto) {
    return this.authService.register(createUserDto, createUserProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    schema: {
      example: {
        user: {
          id: 1,
          email: 'nazar3@mail.ru',
          createdAt: '2023-10-01T12:00:00.000Z',
          updatedAt: '2023-10-01T12:00:00.000Z'
        },
        email: 'nazar3@mail.ru',
        profile: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '123-456-7890',
          address: '123 Main St, Anytown, USA',
          createdAt: '2023-10-01T12:00:00.000Z',
          updatedAt: '2023-10-01T12:00:00.000Z'
        },
        role: {
          id: 2,
          name: 'User'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('profile')
  async getProfile(@Request() req) {
    const userProfile = await this.authService.getUserProfile(req.user.id);
    const userRole = await this.authService.getUserRole(req.user.id)
    console.log(req.user);
    
    return {
      user: req.user,
      profile: userProfile,
      role: userRole
    };
  }

  @ApiOperation({ summary: 'Создание профиля пользователя' })
  @ApiBody({ type: CreateUserProfileDto })
  @Post('user-profile')
  @UsePipes(new ValidationPipe())
  createUserProfile(@Body() createUserProfileDto: CreateUserProfileDto) {
    return this.authService.createUserProfile(createUserProfileDto);
  }

  @ApiOperation({ summary: 'Создание категории' })
  @ApiBody({ type: CreateCategoryDto })
  @Post('category')
  @UsePipes(new ValidationPipe())
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.authService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Создание продукта' })
  @ApiBody({ type: CreateProductDto })
  @Post('product')
  @UsePipes(new ValidationPipe())
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.authService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Создание статуса платежа' })
  @ApiBody({ type: CreatePaymentStatusDto })
  @Post('payment-status')
  @UsePipes(new ValidationPipe())
  createPaymentStatus(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.authService.createPaymentStatus(createPaymentStatusDto);
  }

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiBody({ type: CreateOrderDto })
  @Post('order')
  @UsePipes(new ValidationPipe())
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.authService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Создание элемента заказа' })
  @ApiBody({ type: CreateOrderItemDto })
  @Post('order-item')
  @UsePipes(new ValidationPipe())
  createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.authService.createOrderItem(createOrderItemDto);
  }
}
