import { ProductQueryDto, ProductSortOption } from "./dto/product-query.dto";

const SORT_OPTIONS: ProductSortOption[] = [
  "newest",
  "price-asc",
  "price-desc",
  "popular",
];

function parseNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseBoolean(value: unknown): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function parseCategories(value: unknown): string[] | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  return value
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);
}

function parseSort(value: unknown): ProductSortOption | undefined {
  if (typeof value !== "string") return undefined;
  return SORT_OPTIONS.includes(value as ProductSortOption)
    ? (value as ProductSortOption)
    : undefined;
}

export function parseProductQuery(query: Record<string, unknown>): ProductQueryDto {
  return {
    search: typeof query.search === "string" ? query.search.trim() : undefined,
    categories: parseCategories(query.categories),
    minPrice: parseNumber(query.minPrice),
    maxPrice: parseNumber(query.maxPrice),
    inStockOnly: parseBoolean(query.inStockOnly),
    sort: parseSort(query.sort),
    page: parseNumber(query.page),
    limit: parseNumber(query.limit),
  };
}
