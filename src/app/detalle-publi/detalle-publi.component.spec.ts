import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePubliComponent } from './detalle-publi.component';

describe('DetallePubliComponent', () => {
  let component: DetallePubliComponent;
  let fixture: ComponentFixture<DetallePubliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePubliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePubliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
