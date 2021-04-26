import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: string) {
    return this.categoriesRepository.findOne({ where: [{ id }] });
  }

  findByIds(ids: string[]) {
    return this.categoriesRepository.findByIds(ids);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.save({
      id,
      ...updateCategoryDto,
    });
  }

  remove(id: string) {
    return this.categoriesRepository.softDelete({ id });
  }
}
