import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Column, Product } from '../../core/models/product.model';
import {MessageService} from 'primeng/api';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent  {
  @Input() products: [];
  @Output() afterDeletion = new EventEmitter<void>();

  cols: Column[];
  selectedProduct: Product;

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {
    this.cols = [
      {field: 'name', header: 'Name', isSortable: true},
      {field: 'price', header: 'Price', isSortable: true},
      {field: 'type', header: 'Product Type', isSortable: true},
      {field: 'active', header: 'Active', isSortable: true},
      {field: 'actions', header: 'Actions', isSortable: false}
    ];
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        this.messageService.add({severity: 'success', summary: 'Delete Product', detail: 'Product deleted successfully', life: 3000});
        this.afterDeletion.emit();
      },
      (err) => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Delete Product', detail: 'Failed to delete Product', life: 3000});
        this.afterDeletion.emit();
      });
  }

  deleteProductClicked(product: Product): void {
    this.selectedProduct = product;
  }
}
