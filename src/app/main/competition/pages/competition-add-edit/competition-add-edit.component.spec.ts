import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddEditComponent } from './competition-add-edit.component';

describe('CompetitionAddEditComponent', () => {
  let component: CompetitionAddEditComponent;
  let fixture: ComponentFixture<CompetitionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
