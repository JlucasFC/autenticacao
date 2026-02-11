import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from '../auth/hashing/hashing.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const hashPassword = await this.hashingService.hash(
      createCompanyDto.passowrd,
    );

    const company = this.companyRepository.create({
      name: createCompanyDto.name,
      passowrd: hashPassword,
      email: createCompanyDto.email,
    });
    return await this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const dataCompany = {
      name: updateCompanyDto?.name,
      email: updateCompanyDto?.email,
    };

    if (updateCompanyDto?.passowrd) {
      const hashPassword = await this.hashingService.hash(
        updateCompanyDto.passowrd,
      );
      dataCompany['passowrd'] = hashPassword;
    }

    const company = await this.companyRepository.preload({
      id,
      ...dataCompany,
    });

    if (!company) {
      throw new NotFoundException('company não encontrada');
    }
    console.log(company);

    return this.companyRepository.save(company);
  }

  remove(id: string) {
    return this.companyRepository.delete(id);
  }
}
