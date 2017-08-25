import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class BucketAPIService {

    constructor(private _http: Http) {}
    // This is not used...
    register(user){
        return this._http.post('/register', user)
        .map(data => data.json())
        .toPromise();
    };
    // Login and register a user.
    login(user){
        return this._http.post('/login', user)
        .map(data => data.json())
        .toPromise();
    };
    // Create new Bucket item for a user.
    create(bucket){
        return this._http.post('/create', bucket)
        .map(data => data.json())
        .toPromise();
    };
    // Get all users so we can view them in dashboard
    getUser(){
        return this._http.get('/get_user')
        .map(data => data.json())
        .toPromise();
    };

    getAll(){
        return this._http.get('/getAll')
        .map(data => data.json())
        .toPromise();
    };

    getDisplay(name){
        return this._http.post('/getDisplay', name)
        .map(data => data.json())
        .toPromise();
    };
    // IF bucket list item is DONE.
    check(bucket){
        return this._http.post('/check', bucket)
        .map(data => data.json())
        .toPromise();
    };
    // PENDING bucket list item.
    uncheck(bucket){
        return this._http.post('/uncheck', bucket)
        .map(data => data.json())
        .toPromise();
    };
    // Tag another USER to have the same bucket list item as yourself.
    // unsure if this works.
    tag(bucket){
        return this._http.post('/tag', bucket)
        .map(data => data.json())
        .toPromise();
    };
};
