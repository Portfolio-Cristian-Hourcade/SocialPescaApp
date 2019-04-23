import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LugaresItemComponent } from './lugares-item.component';

describe('LugaresItemComponent', () => {
  let component: LugaresItemComponent;
  let fixture: ComponentFixture<LugaresItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugaresItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LugaresItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
