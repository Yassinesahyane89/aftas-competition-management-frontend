import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrOptions } from 'ng2-flatpickr';


// services
import { CompetitionService } from "../../service/competition.service";

// lodash
import { cloneDeep } from 'lodash';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
@Component({
  selector: 'app-competition-add-edit',
  templateUrl: './competition-add-edit.component.html',
  styleUrls: ['./competition-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompetitionAddEditComponent implements OnInit {
    public contentHeader: object;
    public featuredImage: string;
    isCompetitionCreated: boolean = false;
    public pageType: string;
    public pageTitle: string;

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
      private competitionService: CompetitionService
  ) {  }


    // add checkPageType method for checking page type
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

    // add getCompetitionById method for getting competition by id
    getCompetitionById(id) {
        this.competitionService.getCompetitionById(id).subscribe((response: any) => {
            this.competition = response.data;
        });
    }

    // add ngOnInit method
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
