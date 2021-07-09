import { Component } from '@angular/core';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  products: Product[];

  constructor(private productService:ProductService){
    this.productService.getProductList().subscribe(data=>{
      this.products = data
    })
  }
}
