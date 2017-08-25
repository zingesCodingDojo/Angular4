import { Component, OnInit } from '@angular/core';
import { BucketAPIService } from '../bucket-api.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();

  constructor(
    private _bucketAPI: BucketAPIService,
    private _router: Router) {}

  ngOnInit() {
  }
  // login...

  login() {
    this._bucketAPI.login(this.user)
    .then(() => {console.log("Success on login in... duh");
    this._router.navigate(['dashboard'])})
    .catch(err => {console.log("Somehow there was an error", err)})
  };
}
