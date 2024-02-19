import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

export const ProducttoDb = async (payload: Product) => {
  const product = new ProductModel(payload);
  await product.save();
  return product;
};
