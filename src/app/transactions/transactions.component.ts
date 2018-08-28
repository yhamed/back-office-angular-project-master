import { Component, OnInit } from '@angular/core';
import {AppDataService} from "../shared/services/app-data.service";
import {Transaction} from "../shared/models/transaction";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private appData: AppDataService) { }
transactions: Transaction[];
  ngOnInit() {
    this.appData.getTransactions().subscribe(e=> {
      this.transactions= e.json();
    });
  }

}
