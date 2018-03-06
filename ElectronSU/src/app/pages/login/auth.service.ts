/**
 * Created by s.nolanr on 7/25/2017.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';

declare var $: any;
declare var swal: any;

@Injectable()
export class AuthService {

    BASE_URL = 'http://localhost:5200';
    NAME_KEY = 'name';
    TOKEN_KEY = 'token';


    constructor(private http: Http, private router: Router) {
    }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get isAuthenticated() {
        console.log('isAuthenticated() Checking if authenticated');
        console.log(!!localStorage.getItem(this.TOKEN_KEY));
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    get tokenHeader() {
        var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({headers: header});
    }

    login(user) {
        console.log('login method called');
        console.log(user);
        this.http.post(this.BASE_URL + '/auth/login', user)
            .subscribe(res => {
                    this.authenticate(res);
                    console.log(res.json());
                },error => {
                swal({
                    text:'Invalid username or password',
                    type:'error',
                    showConfirmButton:false,
                    position:'top',
                    timer:1500
                })
                }
            )
    }

    logout() {
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['pages/login'])
    }

    authenticate(res) {
        console.log('authenticate method called');
        var authResponse = res.json();
        console.log('authenticate(res): ' + authResponse.token + " " + authResponse.name + authResponse.status);

            console.log('setting local storage variables');
            console.log('authresponse.token: ' +authResponse.token);
            localStorage.setItem(this.TOKEN_KEY,authResponse.token);
            localStorage.setItem(this.NAME_KEY, authResponse.name);
            $('#loginModal').modal('hide');
            this.router.navigate(['/pages/sudblander'])
        }
    }

export class User {
    constructor(public username: string,
                public password: string) {
    }
}

