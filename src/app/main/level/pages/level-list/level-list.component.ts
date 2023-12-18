import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

//services
import {LevelService} from "../../service/level.service";

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LevelListComponent implements OnInit {

  public selectedOption = 10;
  public searchValue = '';
  public ColumnMode = ColumnMode;
  public levelList : any = [];
  public tempData = [];

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
      private levelService: LevelService,
  ) { }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    this.levelList = this.tempData.filter(function (d) {
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.table.offset = 0;
  }

  // get all level method
  getAllLevel() {
    this.levelService.getAllLevel().subscribe((response: any) => {
      this.levelList = response.data;
      // add to levelList an attribute called 'level' with value 'level' +code
        this.levelList.forEach((level) => {
            level.level = 'Level ' + level.code;
        });
      this.tempData = this.levelList;
    });
  }

  ngOnInit(): void {
    this.getAllLevel();
  }

}
