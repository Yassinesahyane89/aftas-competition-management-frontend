import { Component, OnInit } from '@angular/core';

import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

import { toastrSlideY } from './custom-toastr.animation';
@Component({
  selector: 'app-custom-toastr-component',
  templateUrl: './custom-toastr.component.html',
  styleUrls: ['./custom-toastr.component.scss'],
  animations: [toastrSlideY],
  preserveWhitespaces: false
})
export class CustomToastrComponent extends Toast{
  constructor(protected toastrService: ToastrService, public toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }
}
