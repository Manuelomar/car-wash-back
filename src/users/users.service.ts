import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    try {
      const email = 'zaimon321@gmail.com';
      let admin = await this.usersRepository.findOne({ where: { email } });
      const passwordHash = await bcrypt.hash('Zaimon123', 10);
      
      if (!admin) {
        admin = this.usersRepository.create({
          email,
          username: 'ManuelOmar',
          passwordHash,
        });
        await this.usersRepository.save(admin);
        this.logger.log('Default admin user created successfully');
      } else {
        admin.passwordHash = passwordHash;
        admin.username = 'ManuelOmar';
        await this.usersRepository.save(admin);
        this.logger.log('Default admin user updated successfully');
      }
    } catch (e) {
      this.logger.error('Failed to seed default admin user', e);
    }
  }

  async findByUsernameOrEmail(identifier: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [
        { username: identifier },
        { email: identifier },
      ],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
