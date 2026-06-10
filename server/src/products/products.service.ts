import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct, Product } from "./models/product.model";

export class ProductsService {
  async findAll(): Promise<IProduct[]> {
    return Product.find();
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async create(dto: CreateProductDto): Promise<IProduct> {
    // TODO: implement create
    throw new Error("Not implemented");
  }

  async update(id: string, dto: UpdateProductDto): Promise<IProduct | null> {
    // TODO: implement update
    throw new Error("Not implemented");
  }

  async remove(id: string): Promise<IProduct | null> {
    // TODO: implement delete
    throw new Error("Not implemented");
  }
}

export const productsService = new ProductsService();
