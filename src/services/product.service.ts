import { CreateProduct } from "@/interface/product";
import { Product } from "@/model/products";

export class ProductService {
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows: products, count: total } = await Product.findAndCountAll({
      offset,
      limit,
    });
    return { products, total };
  }

  async findOne(id: string) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async create(data: CreateProduct) {
    const newProduct = await Product.create(data);
    return newProduct?.dataValues;
  }

  async update(id: string, data: any) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.update(data);
    return product;
  }

  async remove(id: string) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");

    await product.destroy();
    return { message: "Product deleted successfully" };
  }
}