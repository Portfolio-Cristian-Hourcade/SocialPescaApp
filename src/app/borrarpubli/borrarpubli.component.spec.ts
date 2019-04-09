import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarpubliComponent } from './borrarpubli.component';

describe('BorrarpubliComponent', () => {
  let component: BorrarpubliComponent;
  let fixture: ComponentFixture<BorrarpubliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarpubliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarpubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
