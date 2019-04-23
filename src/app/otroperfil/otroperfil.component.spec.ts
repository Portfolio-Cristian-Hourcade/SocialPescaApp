import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroperfilComponent } from './otroperfil.component';

describe('OtroperfilComponent', () => {
  let component: OtroperfilComponent;
  let fixture: ComponentFixture<OtroperfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtroperfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtroperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
