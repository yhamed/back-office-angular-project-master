import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../shared/models/product";
import {AppDataService} from "../shared/services/app-data.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

@Input() produit: Product;
@Output() refreshList = new EventEmitter<boolean>();
  constructor(private appData: AppDataService) { }

  ngOnInit() {
  }
emit() {
    this.refreshList.emit(true);
}
detectKey(e) {
    console.log("key press");
if(e.Key === 'Enter') {
  this.addProduct();
}
}
addProduct() {
    if(this.produit.id ==null) {

      this.appData.addProduct(this.produit);
    }  else {
      this.appData.updateProduct(this.produit);
    }
this.emit();
}
}
