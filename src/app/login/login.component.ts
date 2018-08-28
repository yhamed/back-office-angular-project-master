import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../shared/services/admin.service';
import {Subscription} from 'rxjs/Subscription';
import {Credentials} from "../shared/models/credential";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  busy: Subscription;

  constructor ( private adminService: AdminService, private router: Router, private userService: UserService ) {
  }

  credentials: Credentials;

  ngOnInit () {
    this.credentials = new Credentials ();
    this.userService.logout();
  }

  attemptLogin () {
    // TODO WebService Admin
    /*this.busy = this.adminService.loginAdmin(this.credentials).subscribe(data => {
      this.adminService.saveAdmin(data);
      this.router.navigate(['/'], {queryParams: {reload: true}});
    });*/
    this.adminService.login ( this.credentials.email, this.credentials.password ).subscribe ( rslt => {
      if (rslt) {
        this.adminService.Dologin ( rslt );
        this.router.navigate ( ['/'], {queryParams: {reload: true}} );
      }
    } );
    //  this.router.navigate(['/'], {queryParams: {reload: true}});
  }
}
