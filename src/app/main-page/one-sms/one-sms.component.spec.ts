import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSmsComponent } from './one-sms.component';

describe('OneSmsComponent', () => {
  let component: OneSmsComponent;
  let fixture: ComponentFixture<OneSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
