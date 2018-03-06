import {Component, OnInit} from '@angular/core';
import {AuthService, User} from './auth.service';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'login-cmp',
    providers: [AuthService],
    styles: [('animate.css')],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    test: Date = new Date();
    private user = new User('', '');


    ngOnInit() {
        this.checkFullPageBackgroundImage();
        $('#loginModal').modal('show');
        $('#loginModal').appendTo('body');
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
        console.log('ngOnInit called');
    }

    get userInfo() {
        return this.user;
    }

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    constructor(private auth: AuthService, private router:Router) {
    }

    public onFormSubmit(form: NgForm): void {
        const values = form.value;
        console.log(form.value);
        console.log(this.user.username + " " + this.user.password);
        this.user.username = values.username;
        this.user.password = values.password;
        this.auth.login(this.user);
    }

}

