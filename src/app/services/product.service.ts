import { Service, signal } from '@angular/core';
import { Product, PRODUCTS } from '../models/product';

@Service()
export class ProductService {
  private _products = signal<Product[]>([...PRODUCTS])
  products = this._products.asReadonly()
}
