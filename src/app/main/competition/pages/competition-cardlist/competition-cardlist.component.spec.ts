import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCardlistComponent } from './competition-cardlist.component';

describe('CompetitionCardlistComponent', () => {
  let component: CompetitionCardlistComponent;
  let fixture: ComponentFixture<CompetitionCardlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionCardlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionCardlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
