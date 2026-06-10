import { SortOrder } from "mongoose";
import { HttpError } from "../common/errors/http-error";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductQueryDto } from "./dto/product-query.dto";
import { ProductListResponseDto } from "./dto/product-list-response.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IProduct, Product } from "./models/product.model";
import { toProductDto } from "./product.mapper";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 48;

function buildSort(sort?: ProductQueryDto["sort"]): Record<string, SortOrder> {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "popular":
      return { popularity: -1, createdAt: -1 };
    case "newest":
    default:
      return { createdAt: -1 };
  }
}

function buildFilter(query: ProductQueryDto): Record<string, unknown> {
  const filter: Record<string, unknown> = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.categories?.length) {
    filter.category = { $in: query.categories };
  }

  const priceFilter: { $gte?: number; $lte?: number } = {};
  if (query.minPrice !== undefined) priceFilter.$gte = query.minPrice;
  if (query.maxPrice !== undefined) priceFilter.$lte = query.maxPrice;
  if (Object.keys(priceFilter).length > 0) {
    filter.price = priceFilter;
  }

  if (query.inStockOnly) {
    filter.stock = { $gt: 0 };
  }

  return filter;
}

export class ProductsService {
  async findMany(query: ProductQueryDto): Promise<ProductListResponseDto> {
    const page = Math.max(query.page ?? DEFAULT_PAGE, 1);
    const limit = Math.min(Math.max(query.limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
    const filter = buildFilter(query);
    const sort = buildSort(query.sort);
    const skip = (page - 1) * limit;

    const [products, total, categories] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filter),
      Product.distinct("category"),
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return {
      products: products.map(toProductDto),
      total,
      page,
      limit,
      totalPages,
      categories: categories.filter(Boolean).sort() as string[],
    };
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async getCategories(): Promise<string[]> {
    const categories = await Product.distinct("category");
    return categories.filter(Boolean).sort() as string[];
  }

  async create(dto: CreateProductDto): Promise<IProduct> {
    if (!dto.name?.trim()) {
      throw new HttpError(400, "Product name is required");
    }
    if (!dto.description?.trim()) {
      throw new HttpError(400, "Product description is required");
    }
    if (dto.price === undefined || dto.price < 0) {
      throw new HttpError(400, "A valid product price is required");
    }

    return Product.create({
      name: dto.name.trim(),
      description: dto.description.trim(),
      price: dto.price,
      imageUrl: dto.imageUrl?.trim(),
      category: dto.category?.trim(),
      stock: dto.stock ?? 0,
      popularity: dto.popularity ?? 0,
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<IProduct | null> {
    const updates: Partial<IProduct> = {};

    if (dto.name !== undefined) updates.name = dto.name.trim();
    if (dto.description !== undefined) updates.description = dto.description.trim();
    if (dto.price !== undefined) updates.price = dto.price;
    if (dto.imageUrl !== undefined) updates.imageUrl = dto.imageUrl.trim();
    if (dto.category !== undefined) updates.category = dto.category.trim();
    if (dto.stock !== undefined) updates.stock = dto.stock;
    if (dto.popularity !== undefined) updates.popularity = dto.popularity;

    return Product.findByIdAndUpdate(id, updates, { new: true });
  }

  async remove(id: string): Promise<IProduct | null> {
    return Product.findByIdAndDelete(id);
  }
}

export const productsService = new ProductsService();
