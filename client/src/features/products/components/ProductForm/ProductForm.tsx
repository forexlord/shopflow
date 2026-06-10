import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormField,
  Icon,
  Input,
  Label,
  Select,
  Spinner,
  Text,
} from "../../../../design-system";
import {
  createProduct,
  fetchCategories,
  updateProduct,
} from "../../../../api/products.api";
import { useAuth } from "../../../../context/AuthContext";
import { useToast } from "../../../../context/ToastContext";
import type { Product } from "../../../../types/product.types";
import { cx } from "../../../../design-system/utils/cx";
import styles from "./ProductForm.module.css";

const DEFAULT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Accessories",
  "Home & Living",
];

export interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
}

type SubmitState = "idle" | "loading" | "success";

export function ProductForm({ mode, product }: ProductFormProps) {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { showToast } = useToast();
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [stock, setStock] = useState(product?.stock?.toString() ?? "0");
  const [description, setDescription] = useState(product?.description ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");

  useEffect(() => {
    fetchCategories()
      .then((items) => {
        if (items.length > 0) {
          setCategories(items);
        }
      })
      .catch(() => undefined);
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!token || submitState !== "idle") return;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (!trimmedName || !trimmedDescription) return;
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) return;
    if (!Number.isInteger(parsedStock) || parsedStock < 0) return;

    setSubmitState("loading");

    const payload = {
      name: trimmedName,
      description: trimmedDescription,
      price: parsedPrice,
      stock: parsedStock,
      category: category.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    };

    try {
      const saved =
        mode === "create"
          ? await createProduct(payload, token)
          : await updateProduct(product!.id, payload, token);

      setSubmitState("success");
      showToast(
        mode === "create" ? "Product created" : "Product updated",
        "success"
      );

      window.setTimeout(() => {
        navigate(`/products/${saved.id}`);
      }, 600);
    } catch {
      setSubmitState("idle");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.fields}>
        <FormField label={<Label htmlFor="product-name">Product name</Label>}>
          <Input
            id="product-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Minimalist Wireless Keyboard"
            required
          />
        </FormField>

        <div className={styles.row}>
          <FormField label={<Label htmlFor="category">Category</Label>}>
            <Select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </FormField>

          <FormField label={<Label htmlFor="price">Price</Label>}>
            <div className={styles.priceWrap}>
              <span className={styles.pricePrefix}>$</span>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0.00"
                className={styles.priceInput}
                required
              />
            </div>
          </FormField>

          <FormField label={<Label htmlFor="stock">Stock quantity</Label>}>
            <Input
              id="stock"
              type="number"
              min="0"
              step="1"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              placeholder="0"
              required
            />
          </FormField>
        </div>

        <FormField label={<Label htmlFor="description">Description</Label>}>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell the customer about your product..."
            rows={4}
            required
          />
        </FormField>

        <FormField label={<Label htmlFor="image-url">Image URL (optional)</Label>}>
          <Input
            id="image-url"
            type="url"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
          />
          <Text variant="micro" color="secondary" className={styles.hint}>
            Paste a direct public image link — for example an Unsplash URL. This
            is not a file upload.
          </Text>
        </FormField>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(-1)}
          disabled={submitState === "loading"}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className={cx(
            styles.submitButton,
            submitState === "success" && styles.success
          )}
          disabled={submitState !== "idle"}
        >
          {submitState === "loading" ? (
            <Spinner />
          ) : submitState === "success" ? (
            <Icon name="check_circle" size="sm" />
          ) : null}
          {submitState === "success"
            ? "Saved!"
            : mode === "create"
              ? "Save product"
              : "Update product"}
        </Button>
      </div>
    </form>
  );
}
