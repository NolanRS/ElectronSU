import {Component, OnInit} from '@angular/core';
import {LockService} from "./lock.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


declare var $: any;
declare var swal: any;


@Component({
    moduleId: module.id,
    selector: 'lock-cmp',
    templateUrl: './lock.component.html'
})

export class LockComponent implements OnInit {
    test: Date = new Date();
    assetSearchForm: FormGroup;
    assetAddForm: FormGroup;

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    constructor(private fbuilder: FormBuilder,private queryService:LockService) {
    }

    ngOnInit() {
        this.checkFullPageBackgroundImage();

        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
        this.assetSearchForm = this.fbuilder.group({
            computerName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        })
        this.assetAddForm = this.fbuilder.group({
            computerName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
            manufacturer: $('.selectpicker option:selected').val(),
            type: '',
            location: '',
        })
    }

    public onFormSubmit(type): void {
        this.queryService.onSearchSubmit(type,this.assetSearchForm);
        this.assetSearchForm.reset();
    }

    public onAddSubmit(): void {
        this.queryService.onAddSubmit(this.assetAddForm);
        this.assetAddForm.reset();
        $('.selectpicker').selectpicker('refresh');

    }

}



