import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";


import { NgxDatatableModule } from "@swimlane/ngx-datatable";

// level
import { LevelListComponent } from "./pages/level-list/level-list.component";
import {LevelAddEditComponent} from "./pages/level-add-edit/level-add-edit.component";

// routing
const routes: Routes = [
    {
        path: "list",
        component: LevelListComponent,
        data: { animation: "LevelListComponent" },
    },
    {
        path: "add",
        component: LevelAddEditComponent,
        data: { animation: "LevelAddEditComponent" },
    },
    {
        path: "edit/:id",
        component: LevelAddEditComponent,
        data: { animation: "LevelAddEditComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
  ];
@NgModule({
  declarations: [LevelListComponent, LevelAddEditComponent],
  imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxDatatableModule,
        FormsModule,
  ]
})
export class LevelModule { }
