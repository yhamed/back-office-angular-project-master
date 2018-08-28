import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../shared/models/user";
import {AppDataService} from "../../shared/services/app-data.service";

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {

  @Input() user: User;
  password: string;
  passwordConfirm: string;
  @Output() refresh = new EventEmitter();
  emailFree: boolean;
  constructor(private appData: AppDataService) { }

  ngOnInit() {
  }
  emit() {
    this.refresh.emit();
  }

  addUser() {
    if(this.user.id!= null) {
      this.appData.updateUser(this.user).subscribe(e => console.log(e.json()));
    } else {
      this.user.password = this.passwordConfirm;
      this.appData.addUser(this.user).subscribe(e => console.log(e.json()));
    }
    this.emit();
  }
  checkEmail() {
    if (this.user.email!== '') {
      this.appData.checkUsername(this.user.email).subscribe((e:any) => {
        this.emailFree = e.json();
        if (e === false) {
         // this.toast.Info('Le nom d\'utilisateur est déja utilisé', 'Tanit');
        }
      });
    }
  }
  canSubmit() {
    return (!this.emailFree || (this.password !== this.passwordConfirm));
  }


}
