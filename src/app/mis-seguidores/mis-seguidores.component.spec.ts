import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSeguidoresComponent } from './mis-seguidores.component';

describe('MisSeguidoresComponent', () => {
  let component: MisSeguidoresComponent;
  let fixture: ComponentFixture<MisSeguidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisSeguidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisSeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
