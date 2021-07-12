import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-delete-confirmation',
  templateUrl: './product-delete-confirmation.component.html',
  styleUrls: ['./product-delete-confirmation.component.scss']
})
export class ProductDeleteConfirmationComponent {
  @Output() deleteConfirmed = new EventEmitter<Product>();
  @Input() product: Product;

  submit(): void {
    this.deleteConfirmed.emit(this.product);
  }
}
