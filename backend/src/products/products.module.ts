// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- Thêm dòng này
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity'; // <--- Thêm dòng này

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // <--- Đăng ký Entity ở đây
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}