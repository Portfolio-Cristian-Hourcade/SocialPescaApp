import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitaramigoComponent } from './invitaramigo.component';

describe('InvitaramigoComponent', () => {
  let component: InvitaramigoComponent;
  let fixture: ComponentFixture<InvitaramigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitaramigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitaramigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
