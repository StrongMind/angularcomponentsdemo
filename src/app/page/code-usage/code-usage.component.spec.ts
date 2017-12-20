import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeUsageComponent } from './code-usage.component';

describe('CodeUsageComponent', () => {
  let component: CodeUsageComponent;
  let fixture: ComponentFixture<CodeUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
