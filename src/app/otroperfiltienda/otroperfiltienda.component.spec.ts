import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroperfiltiendaComponent } from './otroperfiltienda.component';

describe('OtroperfiltiendaComponent', () => {
  let component: OtroperfiltiendaComponent;
  let fixture: ComponentFixture<OtroperfiltiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtroperfiltiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtroperfiltiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
