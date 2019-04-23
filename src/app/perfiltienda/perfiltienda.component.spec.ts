import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfiltiendaComponent } from './perfiltienda.component';

describe('PerfiltiendaComponent', () => {
  let component: PerfiltiendaComponent;
  let fixture: ComponentFixture<PerfiltiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfiltiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfiltiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
