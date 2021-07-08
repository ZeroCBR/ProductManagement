import { Component } from '@angular/core';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  constructor(private productService:ProductService){
    this.productService.getProductList().subscribe(console.log)
  }
}
