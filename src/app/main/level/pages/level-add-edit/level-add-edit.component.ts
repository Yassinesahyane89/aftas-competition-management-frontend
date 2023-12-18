import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


import {LevelService} from "../../service/level.service";


import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from './custom-toastr/custom-toastr.component';


@Component({
  selector: 'app-level-add-edit',
  templateUrl: './level-add-edit.component.html',
  styleUrls: ['./level-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LevelAddEditComponent implements OnInit {

  public contentHeader: object;
  public description = "";
  public levelId: number;
  public point : number;
  public pageType: string;
  public pageTitle: string;
  private toastRef: any;
  private options: GlobalConfig;

  constructor(
        private toastr: ToastrService,
        private levelListService: LevelService,
        private route: ActivatedRoute,
        private router: Router,
  ) {
    this.options = this.toastr.toastrConfig;
  }
  toastrCustomSuccess() {
    const customToastrRef = cloneDeep(this.options);
    customToastrRef.toastComponent = CustomToastrComponent;
    customToastrRef.closeButton = true;
    customToastrRef.tapToDismiss = false;
    customToastrRef.progressBar = true;
    customToastrRef.toastClass = 'toast ngx-toastr';
    this.toastr.success('Have fun storming the castle!', 'ddf!', customToastrRef);
  }


  // get level by id
    getLevelById(id) {
      this.levelListService.getLevelById(id).
      subscribe(
          (response: any) => {
          this.description = response.data.description;
          this.point = response.data.point;
      },
      (error) => {
        this.router.navigate([`/level/list`]);
      }
      );
    }

    // update level
    updateLevel(form) {
      return this.levelListService.updateLevel({id: this.levelId, description: this.description, point: this.point})
          .subscribe(
                (response: any) => {
                    this.handleSuccess(response,form);
                },(error) => {
                    this.handleError(error,form);
                }
            );
    }

    // add level
    addLevel(form) {
        return this.levelListService.addLevel({description: this.description, point: this.point})
            .subscribe(
                (response: any) => {
                    this.handleSuccess(response,form);
                },(error) => {
                    this.handleError(error,form);
                }
            )
    }

    // handle success case
    handleSuccess(response,form) {

        // redirect to list page /level/list
        this.router.navigate(['/level/list']).then(r => console.log(r));

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
        this.description = '';
        this.point = null;
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


            this.description = form.value['description'];
            this.point = form.value['point'];
        }else {
          const customToastrRef = cloneDeep(this.options);
          customToastrRef.toastComponent = CustomToastrComponent;
          customToastrRef.closeButton = true;
          customToastrRef.tapToDismiss = false;
          customToastrRef.progressBar = true;
          customToastrRef.toastClass = 'toast ngx-toastr';
          this.toastr.error('Something went wrong!', 'Error!', customToastrRef);
        }
    }

    // check if page is add or edit
    checkPageType() {
      if (window.location.href.indexOf('add') > -1) {
        this.pageType = 'add';
        this.pageTitle = 'Add New Level';
      } else {
        this.levelId = + (this.route.snapshot.paramMap.get('id'));
        this.getLevelById(this.levelId);
        this.pageType = 'edit';
        this.pageTitle = 'Edit Level';
      }
    }

    // submit form
    submit(form) {
      if (form.valid) {
        if (this.pageType === 'add') {
          this.addLevel(form)
        } else {
          this.updateLevel(form)
        }
      }
    }


    ngOnInit(): void {
      // check if page is add or edit
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
              name: 'Level',
              isLink: true,
              link: '/level/list'
            },
            {
              name: this.pageTitle,
              isLink: false
            }
          ]
        }
      };
    }
}
