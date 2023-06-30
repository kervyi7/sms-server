import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSmsReportComponent } from './one-sms-report.component';

describe('OneSmsReportComponent', () => {
  let component: OneSmsReportComponent;
  let fixture: ComponentFixture<OneSmsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneSmsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
