import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevogrupoComponent } from './nuevogrupo.component';

describe('NuevogrupoComponent', () => {
  let component: NuevogrupoComponent;
  let fixture: ComponentFixture<NuevogrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevogrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevogrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
