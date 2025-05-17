import { getRepository } from 'typeorm';
import { Category } from '../entities/category.entity';

export async function seedCategories() {
  const categoryRepository = getRepository(Category);

  const categories = [
    { name: 'ноутбук' },
    { name: 'телефон' },
    { name: 'компьютер' },
    { name: 'телевизор' },
    { name: 'наушники' }
  ];

  for (const category of categories) {
    const existingCategory = await categoryRepository.findOne({ where: { name: category.name } });
    if (!existingCategory) {
      await categoryRepository.save(category);
    }
  }

  console.log('Categories seeded successfully');
}

seedCategories().catch(error => console.error('Error seeding categories:', error));
