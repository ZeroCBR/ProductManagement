import {Component, Input, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {Params} from '@angular/router'
import { Column } from 'src/app/core/models/product.model'

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent  {
  @Input() products:[];
  cols: Column[];

  constructor(
    private route: ActivatedRoute
  ) {
    this.cols = [
      {field: 'name', header: 'Name', isSortable: true},
      {field: 'price', header: 'Price', isSortable: true},
      {field: 'productType', header: 'Product Type', isSortable: true},
      {field: 'active', header: 'Active', isSortable: true},
      {field:'action', header:'Action', isSortable: false}
    ]
  }

  buildRequestParams(params: Params): any {
    return {
      page: params['page'] ? params['page'] : 0,
      searchTerm: params['searchTerm'] ? params['searchTerm'] : '',
      pageSize: params['pageSize'] ? params['pageSize'] : null,
      filterFleetStatus: params['filterFleetStatus']
    }
  }
}
