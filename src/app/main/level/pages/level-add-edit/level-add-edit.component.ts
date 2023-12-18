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

  constructor(
        private levelListService: LevelService,
        private route: ActivatedRoute,
        private router: Router,
  ) { }


  ngOnInit(): void {

  }
}
