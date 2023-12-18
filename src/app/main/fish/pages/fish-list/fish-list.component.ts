import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import {Router} from "@angular/router";

//services
import {FishService} from "../../service/fish.service";

@Component({
    selector: 'app-fish-list',
    templateUrl: './fish-list.component.html',
    styleUrls: ['./fish-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FishListComponent implements OnInit {
    public selectedOption = 10;
    public searchValue = '';
    public ColumnMode = ColumnMode;
    public fishList : any = [];
    public tempData = [];

    // Decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private router: Router,
        private fishService: FishService,
    ) { }

    filterUpdate(event) {
        const val = event.target.value.toLowerCase();
        this.fishList = this.tempData.filter(function (d) {
            return d.description.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.table.offset = 0;
    }

    ngOnInit(): void {
    }

}
