import { Component, OnInit } from '@angular/core';
import {FishService} from "../../../fish/service/fish.service";

@Component({
  selector: 'app-competition-add-result2',
  templateUrl: './competition-add-result2.component.html',
  styleUrls: ['./competition-add-result2.component.scss']
})
export class CompetitionAddResult2Component implements OnInit {


  public fishList: any;
  public averageWeight: number;
  public selectedFish = false;
  public selected = [];
  constructor(
      private fishService: FishService
  ) { }

  //get all fish
  getAllFish() {
    this.selectedFish = true;
    this.fishService.getAllFish().subscribe((response: any) => {
      this.fishList = response.data;
      this.selectedFish = false;
    });
  }

  submit(form) {
    if (form.valid) {

    }
  }

  ngOnInit(): void {
  }

}
