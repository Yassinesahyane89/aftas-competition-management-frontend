import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LevelService} from "../../service/level.service";


@Component({
  selector: 'app-level-add-edit',
  templateUrl: './level-add-edit.component.html',
  styleUrls: ['./level-add-edit.component.scss']
})
export class LevelAddEditComponent implements OnInit {

  public contentHeader: object;
  public description = "";
  public levelId: number;
  public point : number;
  public pageType: string;
  public pageTitle: string;

  constructor(
        private levelListService: LevelService,
        private route: ActivatedRoute,
        private router: Router,
  ) { }

  // get level by id
  getLevelById(id) {
    this.levelListService.getLevelById(id).subscribe((response: any) => {
        this.description = response.data.description;
        this.point = response.data.point;
    });
  }

  // update level
  updateLevel() {
    return this.levelListService.updateLevel({id: this.levelId, description: this.description, point: this.point})
  }

  // add level
    addLevel() {
        return this.levelListService.addLevel({description: this.description, point: this.point})
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
