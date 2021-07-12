import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getuid } from 'process';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { Guid } from 'guid-typescript';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductType } from '../core/enums/product-type.enum';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  title: string;
  private routeSub: Subscription;
  ProductType = ProductType;
  productTypes = [];
  isEditMode = false;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(Guid.create().toString(), [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      active: new FormControl(false, [Validators.required]),
    });

    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.productService.getProduct(id).subscribe(product => {
          this.form.patchValue(product);
        });
      }
    });
  }

  createOrUpdate(): void {
    if (!this.isFormValid()) {
      return;
    }

    const product = this.form.value as Product;
    if(this.isEditMode){
      this.productService.updateProduct(product).subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Update Product', detail: 'Product updated successfully'});
          setTimeout(() => {this.router.navigateByUrl(''); }, 2000);
        },
        () => {
          this.messageService.add({severity: 'error', summary: 'Update Product', detail: 'Failed to update product'});
        });
    }else{
      this.productService.createProduct(product).subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Create Product', detail: 'Product created successfully'});
          setTimeout(() => {this.router.navigateByUrl(''); }, 2000);
        },
        () => {
          this.messageService.add({severity: 'error', summary: 'Create Product', detail: 'Failed to create product'});
        });
    }
    
  }

  isFormValid(): boolean {
    if (this.form.invalid) {
      this.messageService.add({severity: 'error', summary: 'Product Form', detail: 'Not valid'});
      Object.values(this.form.controls).map(formControl => formControl.markAsTouched());
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
