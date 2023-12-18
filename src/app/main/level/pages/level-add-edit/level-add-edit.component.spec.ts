import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelAddEditComponent } from './level-add-edit.component';

describe('LevelAddEditComponent', () => {
  let component: LevelAddEditComponent;
  let fixture: ComponentFixture<LevelAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
