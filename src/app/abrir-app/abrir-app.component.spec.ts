import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirAppComponent } from './abrir-app.component';

describe('AbrirAppComponent', () => {
  let component: AbrirAppComponent;
  let fixture: ComponentFixture<AbrirAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
