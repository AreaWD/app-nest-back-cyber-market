import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../db/entities/role.entity';
import { seedCategories } from 'src/db/seeds/category.seed';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seedRoles() {
    const roles = ['Administrator', 'User'];

    for (const roleName of roles) {
      const role = await this.roleRepository.findOne({ where: { name: roleName } });

      if (!role) {
        await this.roleRepository.save({ name: roleName });
      }
    }

    await seedCategories()
  }
}
