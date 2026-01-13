// src/products/entities/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid') // Khóa chính tự sinh dạng chuỗi ngẫu nhiên
  id: string;

  @Column()
  name: string; // Tên sản phẩm

  @Column('decimal')
  price: number; // Giá

  @Column({ nullable: true })
  description: string; // Mô tả (có thể bỏ trống)

  @Column({ default: 'ACTIVE' })
  status: string; // Trạng thái: ACTIVE hoặc INACTIVE

  @CreateDateColumn()
  createdAt: Date; // Ngày tạo (tự động)
}