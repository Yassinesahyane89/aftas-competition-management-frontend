import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

// services
import {FishService} from "../../service/fish.service";
import {LevelService} from "../../../level/service/level.service";
import {CustomToastrComponent} from "../../../../../@core/components/custom-toastr/custom-toastr.component";

// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';

@Component({
  selector: 'app-fish-add-edit',
  templateUrl: './fish-add-edit.component.html',
  styleUrls: ['./fish-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class FishAddEditComponent implements OnInit {
    public contentHeader: object;
    public name = "";
    public averageWeight : number;
    public levelId : number;
    public levelList: any = [];
    public levelOptions: {
        id: number,
        level: string,
        point: number,
    }[];
    public selectedLevelId: number= null;
    public pageType: string;
    public pageTitle: string;
    private toastRef: any;
    private options: GlobalConfig;


    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fishService: FishService,
        private levelService: LevelService,
    ) { }

    // get level list
    getLevelList() {
        this.levelService.getAllLevel().
        subscribe((response: any) => {
            this.levelList = response.data;
            this.levelList.forEach((level) => {
                level.level = 'Level ' + level.code;
            });
            this.levelOptions = this.levelList;
        });
    }

    // get fish by id
    getFishById(id) {
        this.fishService.getFishById(id).
        subscribe(
            (response: any) => {
            this.name = response.data.name;
            this.averageWeight = response.data.averageWeight;
            this.selectedLevelId = response.data.level.id;
        },
        (error) => {
            this.router.navigate([`/fish/list`]);
        }
        );
    }

    // check page type
    checkPageType() {
        if (window.location.href.indexOf('add') > -1) {
            this.pageType = 'add';
            this.pageTitle = 'Add New Level';
        } else {
            this.levelId = + (this.route.snapshot.paramMap.get('id'));
            this.getFishById(this.levelId);
            this.pageType = 'edit';
            this.pageTitle = 'Edit Level';
        }
    }

    // handle success case
    handleSuccess(response,form) {

        // redirect to list page /level/list
        this.router.navigate(['/fish/list']).then(r => console.log(r));

        // Handle success case
        const customToastrRef = cloneDeep(this.options);
        customToastrRef.toastComponent = CustomToastrComponent;
        customToastrRef.closeButton = true;
        customToastrRef.tapToDismiss = false;
        customToastrRef.progressBar = true;
        customToastrRef.toastClass = 'toast ngx-toastr';
        this.toastr.success(response.message, 'Success!', customToastrRef);

        // reset form
        form.reset();
        this.name = '';
        this.averageWeight = null;
        this.levelId = null;
        this.selectedLevelId = null;
    }

    // handle error case
    handleError(error,form) {
        if (error.error && error.error.message) {
            console.log(error.error.message);
            console.log(",jdfsj");
            const customToastrRef = cloneDeep(this.options);
            customToastrRef.toastComponent = CustomToastrComponent;
            customToastrRef.closeButton = true;
            customToastrRef.tapToDismiss = false;
            customToastrRef.progressBar = true;
            customToastrRef.toastClass = 'toast ngx-toastr';
            this.toastr.error(error.error.message, 'Error!', customToastrRef);

        } else if (error && error.error) {
            const validationErrors = error.error;

            Object.keys(validationErrors).forEach((key) => {
                const control = form.controls[key];
                if (control) {
                    control.setErrors({serverError: validationErrors[key].join(', ')});
                }
                console.log(form.controls['point'])
            });
        }
    }

    // add new fish
    addNewFish(form) {
        this.fishService.addFish({ name: this.name, averageWeight: this.averageWeight, levelId: this.selectedLevelId }).
        subscribe(
            (response: any) => {
                this.handleSuccess(response,form);
            },(error) => {
                this.handleError(error,form);
            }
        )
    }

    submit(form) {

    }
    ngOnInit(): void {
        // init level list
        this.getLevelList();

        // check page type
        this.checkPageType();

        // content header
        this.contentHeader = {
            headerTitle: this.pageTitle,
            actionButton: true,
            breadcrumb: {
                type: '',
                links: [
                    {
                        name: 'Home',
                        isLink: true,
                        link: '/'
                    },
                    {
                        name: 'Fish',
                        isLink: true,
                        link: '/fish/list'
                    },
                    {
                        name: this.pageTitle,
                        isLink: false
                    }
                ]
            }
        };
    }

    AddNewLevel() {
        this.router.navigate(['/level/add']);
    }

}
