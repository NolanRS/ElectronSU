
import { Component, OnInit,Input } from '@angular/core';
import {AuthService,User} from "../login/auth.service";
import {Router} from "@angular/router";


declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'pricing-cmp',
    providers:[AuthService],
    templateUrl: './pricing.component.html'
})

export class PricingComponent implements OnInit{
    @Input() User;
    test : Date = new Date();

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    ngOnInit(){
        this.checkFullPageBackgroundImage();
    }
    constructor(private auth: AuthService, private router: Router) {
    }
    assetDBClick= function () {
        this.router.navigateByUrl('/pages/lock');
    };
    recycleDBClick = function (){
        this.router.navigateByUrl("/pages/recycle")
    }
}
