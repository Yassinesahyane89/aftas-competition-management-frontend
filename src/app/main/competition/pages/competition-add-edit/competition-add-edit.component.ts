import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrOptions } from 'ng2-flatpickr';


// services
import { CompetitionService } from "../../service/competition.service";

// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { CustomToastrComponent } from '@core/components/custom-toastr/custom-toastr.component';

@Component({
  selector: 'app-competition-add-edit',
  templateUrl: './competition-add-edit.component.html',
  styleUrls: ['./competition-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionAddEditComponent implements OnInit {
    public contentHeader: object;
    public fromDate: NgbDate | null;
    public toDate: NgbDate | null;
    public   timeOptions: FlatpickrOptions = {
        enableTime: true,
        noCalendar: true,
        altInput: true
    }
    public fileName = undefined;
    public featuredImage: string;
    isCompetitionCreated: boolean = false;
    public pageType: string;
    public pageTitle: string;
    private toastRef: any;
    private options: GlobalConfig;

    public competition: any = {
        code: '',
        amount: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        numberOfParticipants: '',
    };

  constructor(
      private toastr: ToastrService,
      private route: ActivatedRoute,
      private competitionService: CompetitionService,
      private calendar: NgbCalendar,
      private formatter: NgbDateParserFormatter
  ) {
      this.options = this.toastr.toastrConfig;
  }

  // git commit -m "add isDisabled and isWeekend methods"
  isDisabled = (date: NgbDate, current: { month: number; year: number }) => date.month !== current.month;
  isWeekend = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;

  // git commit -m "add uploadImage method"
    uploadImage(event: any) {
        if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();

        reader.onload = (event: any) => {
            this.featuredImage = event.target.result;
        };

        this.fileName = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
        }
    }

    // git commit -m "add formatTime method for formatting time"
    formatTime(time: NgbTimeStruct) {
        return new Date(this.competition.startTime).toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // git commit -m "add formatDate method for formatting date"
    formatDate(date: NgbDateStruct) {
        return new Date(date.year, date.month - 1, date.day).toISOString().split('T')[0];
    }

    // git commit -m "add checkPageType method for checking page type"
    checkPageType() {
        if (window.location.href.indexOf('add') > -1) {
            this.pageType = 'add';
            this.pageTitle = 'Add New Competition';
        } else {
            this.competition.code = this.route.snapshot.paramMap.get('code');
            this.getCompetitionById(this.competition.code);
            this.pageType = 'edit';
            this.pageTitle = 'Edit Competition';
        }
    }

    //git commit -m "add handleSuccess method for handling success case"
    handleSuccess(response,form) {
        // change button state
        this.isCompetitionCreated = true;

        // Handle success case
        const customToastrRef = cloneDeep(this.options);
        customToastrRef.toastComponent = CustomToastrComponent;
        customToastrRef.closeButton = true;
        customToastrRef.tapToDismiss = false;
        customToastrRef.progressBar = true;
        customToastrRef.toastClass = 'toast ngx-toastr';
        this.toastr.success(response.message, 'Success!', customToastrRef);
    }

    //git commit -m "add handleError method for handling error case"
    handleError(error,form) {
        if (error.error && error.error.message) {
            const customToastrRef = cloneDeep(this.options);
            customToastrRef.toastComponent = CustomToastrComponent;
            customToastrRef.closeButton = true;
            customToastrRef.tapToDismiss = false;
            customToastrRef.progressBar = true;
            customToastrRef.toastClass = 'toast ngx-toastr';
            this.toastr.error(error.error.message, 'Error!', customToastrRef);
        }else if (error && error.error){
            const validationErrors = error.error;

            Object.keys(validationErrors).forEach(prop => {
                const formControl = form.controls[prop];
                if (formControl) {
                    // activate the error message
                    formControl.setErrors({
                        serverError: validationErrors[prop][0]
                    });
                }
            });
        }
    }

    // git commit -m "add methode addNewCompetition for adding new competition"
    addNewCompetition(form) {
        this.competition.startTime = this.formatTime(this.competition.startTime);
        this.competition.endTime = this.formatTime(this.competition.endTime);
        this.competition.date = this.formatDate(this.competition.date);
        this.competitionService.addCompetition(this.competition)
            .subscribe((response :any) => {
                this.handleSuccess(response,form);
                this.competition.code = response.data.code;
            }, (error) => {
                this.handleError(error,form);
            });
    }

    // git commit -m "add methode updateCompetition for updating competition"
    updateCompetition(form) {
        this.competition.startTime = this.formatTime(this.competition.startTime);
        this.competition.endTime = this.formatTime(this.competition.endTime);
        this.competition.date = this.formatDate(this.competition.date);
        this.competitionService.updateCompetition(this.competition)
            .subscribe((response :any) => {
                this.handleSuccess(response,form);
            }, (error) => {
                this.handleError(error,form);
            });
    }

    // git commit -m "add submit method for submitting form"
    submit(form) {
        if (form.valid) {
            if (this.pageType === 'add') {
                this.addNewCompetition(form);
            } else {
                this.updateCompetition(form);
            }
        }
    }


    // git commit -m "add getCompetitionById method for getting competition by id"
    getCompetitionById(id) {
        this.competitionService.getCompetitionById(id).subscribe((response: any) => {
            this.competition = response.data;
        });
    }
    // git commit -m "add ngOnInit method"
    ngOnInit(): void {
        this.featuredImage = "assets/images/illustration/fishing-competition.jpg";
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
                        name: 'Competition',
                        isLink: true,
                        link: '/competition/list'
                    },
                    {
                        name: this.pageTitle,
                        isLink: false,
                    }
                ]
            }
        };
  }

}
