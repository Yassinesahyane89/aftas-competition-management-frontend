import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddResultComponent } from './competition-add-result.component';

describe('CompetitionAddResultComponent', () => {
  let component: CompetitionAddResultComponent;
  let fixture: ComponentFixture<CompetitionAddResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAddResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAddResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
