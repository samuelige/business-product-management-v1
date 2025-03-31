import { Request, Response } from "express";
import asyncWrapper from "@/middleware/asyncWrapper";
import { ProductService } from "@/services/product.service";
import { CreateProductRules } from "@/validations";

const productService = new ProductService();

export const createProductController = asyncWrapper(async(req:Request, res:Response) => {
  await CreateProductRules.validate(req?.body, {abortEarly: false});
  const result = await productService.create(req?.body);
  res.status(201).json({data: result});
});

export const getProductController = asyncWrapper(async(req:Request, res:Response) => {
  const { id } = req.params;

  if (id) {
    const product = await productService.findOne(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return res.status(200).json({ data: product });
  };

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await productService.findAll(page, limit);
  res.status(200).json({data: result});
});

export const updateProductController = asyncWrapper(async(req:Request, res:Response) => {
  const { id } = req.params;

  const product = await productService.update(id, req.body);
  if (!product) {
    throw new Error("Product not found");
  }

  return res.status(200).json({ data: product });
});

export const deleteProductController = asyncWrapper(async(req:Request, res:Response) => {
  const { id } = req.params;
  const product = await productService.remove(id);
  return res.status(200).json({ data: product });
});

