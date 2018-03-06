import {ApiService} from "../../api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

declare var $: any;
declare var swal: any;

@Injectable()
export class LockService {
    constructor(public api: ApiService) {
    }
    response:any;
    public onSearchSubmit(type, form) {
        var persistentapi = this.api;
        let assetFromForm = form.getRawValue();
        let swalAsset = form.get('computerName').value;
        if (type == 'search') {
        this.api.searchAsset(assetFromForm).subscribe(result=> {
            console.log(result.success);
            if(result.success==true){
            $('#searchAssetModal').modal('hide');
            swal('good job!', 'clicking the button', 'success')
            }
        });
            //if successful search make the modal pop up with summary of asset info

            //if failure make the modal pop up with failure to fine

        }
        else if (type == "delete") {
            persistentapi.searchAsset(assetFromForm).subscribe(result=>{
                if(result.success==true){
                    console.log('log from search call: '+result.success);
                    swal({
                        title: 'Are you sure?',
                        text: "Deleting Asset: " + swalAsset,
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes',
                        cancelButtonText: 'Cancel',
                        confirmButtonClass: 'btn btn-success',
                        cancelButtonClass: 'btn btn-danger',
                        buttonsStyling: false
                    }).then(function () {
                        swal(
                            'Success',
                            'Deleted Asset: ' + swalAsset,
                            'success'
                        );
                        console.log("asset from form: "+JSON.stringify(assetFromForm));
                        persistentapi.deleteAsset(assetFromForm).subscribe(result=> {
                            console.log("log from delete call: "+result.success);
                            if (result.success ==true) {
                                $('#deleteAssetModal').modal('hide');
                            }else{
                                swal(
                                    'An error has occured submitting this asset',
                                    'error'
                                    )
                            }
                        });
                    }, function (dismiss) {
                        // dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                        if (dismiss === 'cancel') {
                            swal(
                                'Cancelled',
                                'error'
                            )
                        }
                    })
                }
            })

        }
        else if (type == "update") {
            this.api.searchAsset(assetFromForm).subscribe(result=>{
                if(result.success==true){
                    console.log("log from search call: "+JSON.stringify(result.message));
                }

            });
            this.api.updateAsset(assetFromForm);
            $('#updateAssetModal').modal('hide');
        }
    }

    public onAddSubmit(form){
        let assetToAdd = form.getRawValue();
        console.log(form.getRawValue());
        var computerName = form.get('computerName').value;
        var computerManuf = form.get('manufacturer').value;
        var computerType = form.get('type').value;
        var computerLoc = form.get('location').value;


        var assetInfo = 'Asset Name: '+computerName + "\nAsset Manufacturer: "+ computerManuf + '\nAsset Type: ' + computerType + '\nAsset Location: ' + computerLoc;
        swal({
            title: 'Are you sure?',
            text:assetInfo,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
        });
        this.api.addAsset(assetToAdd).subscribe(result=>{
            if(result.success==true){
                console.log("log from search call: "+JSON.stringify(result.message));
                $('#addAssetModal').modal('hide');
            }
        });
    }



}
