import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelersDetailComponent } from './travelers-detail.component';

describe('TravelersDetailComponent', () => {
  let component: TravelersDetailComponent;
  let fixture: ComponentFixture<TravelersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});