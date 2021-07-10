import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getuid } from 'process';
import { Product } from '../core/models/product.model';
import { ProductService } from '../core/services/product.service';
import { Guid } from 'guid-typescript';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductType } from '../core/enums/product-type.enum';

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

constructor(private route: ActivatedRoute, private productService: ProductService) {}


  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(Guid.create(), [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required]),
    });

    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.title = 'Edit Product';
        this.productService.getProduct(id).subscribe(product => {
          this.form.patchValue(product);
        });
      } else {
      this.title = 'Add Product';
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
