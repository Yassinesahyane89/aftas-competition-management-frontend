import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";

// level
import { LevelListComponent } from "./pages/level-list/level-list.component";
import {LevelAddEditComponent} from "./pages/level-add-edit/level-add-edit.component";
import { CustomToastrComponent } from  './pages/level-add-edit/custom-toastr/custom-toastr.component';

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
        data: { animation: "toastr" },
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
  declarations: [LevelListComponent, LevelAddEditComponent, CustomToastrComponent],
  imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxDatatableModule,
        FormsModule,
        NgbModule,
        CoreCommonModule,
        CoreDirectivesModule,
        ContentHeaderModule,
        ToastrModule
  ]
})
export class LevelModule { }
