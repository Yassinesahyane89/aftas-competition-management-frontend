import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionAddMemberComponent } from './competition-add-member.component';

describe('CompetitionAddMemberComponent', () => {
  let component: CompetitionAddMemberComponent;
  let fixture: ComponentFixture<CompetitionAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionAddMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
