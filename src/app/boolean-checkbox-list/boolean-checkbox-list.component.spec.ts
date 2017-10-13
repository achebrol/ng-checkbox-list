import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanCheckboxListComponent } from './boolean-checkbox-list.component';

describe('CheckboxListComponent', () => {
  let component: BooleanCheckboxListComponent;
  let fixture: ComponentFixture<BooleanCheckboxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanCheckboxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanCheckboxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
