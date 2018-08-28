import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../shared/models/product";
import {AppDataService} from "../shared/services/app-data.service";
import {Observable} from "rxjs/Rx";
import swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
selectedProduct: Product;
addnew: boolean;
updateProducts: boolean;
products: Product[];
img: string;
  constructor(private appData: AppDataService) { }

ngOnDestroy() {
    this.updateProducts = false;
}
selectImage(img) {
    this.img = img;
}
  ngOnInit() {
    this.appData.getProducts().toPromise().then(e=> this.products= e.json());
    this.updateProducts = true;
    this.selectedProduct = new Product();
    this.addnew= false;
    Observable.interval(5000).subscribe(x => {
      if (this.updateProducts) {
        this.appData.getProducts().toPromise().then(e=> this.products= e.json());
      }
    });
  }
deleteProduct(product: Product) {
  swal({
    title: 'Information',
    text: 'Êtes-vous sûr de vouloir supprimer le produit ' +product.label + '?' ,
    type: 'question',
    confirmButtonText: 'Oui',
    showCancelButton: true,
    cancelButtonText: 'Non'
  }).then( (res) => {
    if (res.value === true) {
      this.appData.deleteProduct ( product ).subscribe ( e => console.log ( e ) );
      this.ngOnInit ();
    }
  });

}
  toggle() {
    if(this.addnew) {
      this.selectedProduct = new Product();
    } else {
      this.addnew = true;
    }
      }
      hide() {
  this.addnew = false;
  }
select(p) {
    this.selectedProduct = new Product();
  this.addnew= true;
  this.selectedProduct = p;
}
}
