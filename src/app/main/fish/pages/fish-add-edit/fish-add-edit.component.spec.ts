import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishAddEditComponent } from './fish-add-edit.component';

describe('FishAddEditComponent', () => {
  let component: FishAddEditComponent;
  let fixture: ComponentFixture<FishAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
