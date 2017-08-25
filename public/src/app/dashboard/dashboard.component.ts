import { Component, OnInit } from '@angular/core';
import { BucketAPIService } from '../bucket-api.service';
import { User } from '../user';
import { Bucket } from '../bucket';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    user = new User();
    users = [];
    bucket = new Bucket();

    constructor(
        private _bucketAPI: BucketAPIService,
        private _router: Router
    ) {}

    ngOnInit() {
        this._bucketAPI.getUser()
        .then( user => {this.user = user})
        .catch( () => {console.log("No user. GO LOGIN.");
            this._router.navigate(['/'])});

        this._bucketAPI.getAll()
        .then(users => {this.users = users;})
        .catch( () => {console.log("Failed to get all users.")});
    };
    // Create Bucket List item.
    create(){
        this._bucketAPI.create(this.bucket)
        .then( bucket => {
            if (this.bucket.tagged.length > 0){
                this._bucketAPI.tag(this.bucket)
                .then( bucket => {this.getUser();
                    this.bucket = new Bucket()})
            } else{
                this.getUser();
                this.bucket = new Bucket();
                this._router.navigate(['dashboard'])
            }
        })
        .catch( () => {console.log("Bucket failed to save?")});
    };
    // Get user.
    getUser(){
        this._bucketAPI.getUser()
        .then( user => {this.user = user;})
        .catch( () => {console.log("Failed to get User"); this._router.navigate(['/'])})
    };
    // If someone checks another user... lets add a bucket list item.
    checked(bucket) {
        if (bucket.checked){
            this._bucketAPI.uncheck(bucket)
            .then( () => {this.getUser()})
            .catch( () => {console.log("Failed to uncheck?")})
        } else{
            this._bucketAPI.check(bucket)
            .then( () => {this.getUser()})
            .catch( () => {console.log("Failed to check?")})
        }
    };
};
