import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPickerUsageComponent } from './number-picker-usage.component';

describe('NumberPickerUsageComponent', () => {
  let component: NumberPickerUsageComponent;
  let fixture: ComponentFixture<NumberPickerUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberPickerUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPickerUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
