import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BucketAPIService } from '../bucket-api.service';
import { User } from '../user';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
    user = new User();
    name = '';

    constructor(
        private _route: ActivatedRoute,
        private _bucketAPI: BucketAPIService,
        private _router: Router) {
            this._route.params.subscribe( (param) => {
                this.name = param.name;
            });
        };

    ngOnInit() {
        this._bucketAPI.getDisplay({ name: this.name })
        .then( user => {this.user = user;})
        .catch( err => {this._router.navigate([''])});
    };
};
