import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {AppDataService} from "../shared/services/app-data.service";
import {Observable} from "rxjs/Rx";
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
users: User[];
selectedUser: User;
visible: boolean;
updateUsers: boolean;
  constructor(private appData: AppDataService) { }
addNew() {
    this.selectedUser = new User();
    this.visible= true;
}
selectUser(user) {
    this.selectedUser = user;
    this.visible = true;
}
ngOnDestroy() {
    this.updateUsers = false;
}
  ngOnInit() {
    this.updateUsers = true;
    this.visible = false;
    this.appData.getUsers().subscribe(e=> {
      this.users = e.json();
    });
    Observable.interval(5000).subscribe(x => {
      if (this.updateUsers) {
        this.appData.getUsers().subscribe(e=> {
          this.users = e.json();
        });
      }
    });
  }
doDelete(user) { swal({
  title: 'Information',
  text: 'Êtes-vous sûr de vouloir supprimer l\'admin ' +user.email + '?' ,
  type: 'question',
  confirmButtonText: 'Oui',
  showCancelButton: true,
  cancelButtonText: 'Non'
}).then( (res) => {
  if (res.value === true) {
    this.appData.deleteUser(user).subscribe(e => console.log(e.json()));
    this.ngOnInit ();
  }
});

}

}
