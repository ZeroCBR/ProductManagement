import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './core/services/product.service';
import { ProductTableComponent } from './product-list/product-table/product-table.component';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { ProductDeleteConfirmationComponent } from './product-list/product-delete-confirmation/product-delete-confirmation.component';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductListComponent,
    ProductTableComponent,
    ProductDeleteConfirmationComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    TableModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent, pathMatch: 'full' },
      {path: 'product', component: ProductComponent},
      {path: 'product/:id', component: ProductComponent}
    ])
  ],
  providers: [
    ProductService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
