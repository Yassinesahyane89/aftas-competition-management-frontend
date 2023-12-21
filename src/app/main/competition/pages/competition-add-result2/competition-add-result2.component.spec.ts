import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddResult2Component } from './competition-add-result2.component';

describe('CompetitionAddResult2Component', () => {
  let component: CompetitionAddResult2Component;
  let fixture: ComponentFixture<CompetitionAddResult2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAddResult2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAddResult2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
