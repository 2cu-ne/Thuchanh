import { IsString, IsNumber, IsOptional, MinLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Tên sản phẩm phải có ít nhất 3 ký tự' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Giá phải lớn hơn hoặc bằng 0' })
  price: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
