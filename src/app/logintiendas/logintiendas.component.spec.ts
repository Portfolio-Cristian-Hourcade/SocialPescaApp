import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintiendasComponent } from './logintiendas.component';

describe('LogintiendasComponent', () => {
  let component: LogintiendasComponent;
  let fixture: ComponentFixture<LogintiendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogintiendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
