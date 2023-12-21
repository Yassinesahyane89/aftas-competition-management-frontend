import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from 'ng2-flatpickr';


import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";

// components
import { CompetitionListComponent} from "./pages/competition-list/competition-list.component";
import { CompetitionAddEditComponent} from "./pages/competition-add-edit/competition-add-edit.component";
import { CompetitionItemComponent } from './pages/competition-item/competition-item.component';
import { CompetitionCardlistComponent } from './pages/competition-cardlist/competition-cardlist.component';
import { CompetitionAddMemberComponent } from './pages/competition-add-member/competition-add-member.component';
import { CompetitionAddResultComponent } from './pages/competition-add-result/competition-add-result.component';
import { CompetitionAddResult2Component } from './pages/competition-add-result2/competition-add-result2.component';

const routes: Routes = [
    {
        path: "list",
        component: CompetitionListComponent,
        data: { animation: "CompetitionListComponent" },
    },
    {
        path: "add",
        component: CompetitionAddEditComponent,
        data: { animation: "toastr" },
    },
    {
      path: "cardlist",
      component: CompetitionCardlistComponent,
      data: { animation: "toastr" },
    },
    {
      path: "item",
      component: CompetitionItemComponent,
      data: { animation: "toastr" },
    },
    {
        path: "edit/:id",
        component: CompetitionAddEditComponent,
        data: { animation: "CompetitionAddEditComponent" },
    },
    {
        path: "add-member/:id",
        component: CompetitionAddMemberComponent,
        data: { animation: "CompetitionAddMemberComponent" },
    },
    {
        path: "add-result/:id",
        component: CompetitionAddResultComponent,
        data: { animation: "CompetitionAddResultComponent" },
    },
    {
        path: "**",
        redirectTo: "list",
        pathMatch: "full",
    },
];

@NgModule({
  declarations: [
    CompetitionItemComponent,
    CompetitionCardlistComponent,
    CompetitionListComponent,
    CompetitionAddEditComponent,
    CompetitionAddMemberComponent,
    CompetitionAddResultComponent,
    CompetitionAddResult2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    FormsModule,
    NgbModule,
    CoreCommonModule,
    CoreDirectivesModule,
    ContentHeaderModule,
    ToastrModule,
    NgSelectModule,
    Ng2FlatpickrModule
  ]
})
export class CompetitionModule { }
