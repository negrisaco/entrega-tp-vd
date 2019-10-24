import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignasComponent } from './consignas.component';

describe('ConsignasComponent', () => {
  let component: ConsignasComponent;
  let fixture: ComponentFixture<ConsignasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
