import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    const hashPassword = createCompanyDto.passowrd;

    const company = this.companyRepository.create({
      name: CreateCompanyDto.name,
      passowrd: hashPassword,
    });
    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find();
  }

  findOne(id: string) {
    return this.companyRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const dataCompany = { name: updateCompanyDto?.name };

    if (updateCompanyDto?.passowrd) {
      const hashPassword = updateCompanyDto.passowrd;
      dataCompany['passowrd'] = hashPassword;
    }

    const company = await this.companyRepository.preload({
      id,
      ...dataCompany,
    });

    if (!company) {
      throw new NotFoundException('company não encontrada');
    }

    return this.companyRepository.save(company);
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
