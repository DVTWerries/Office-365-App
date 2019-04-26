import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalContactsComponent } from './personal-contacts.component';

describe('PersonalContactsComponent', () => {
  let component: PersonalContactsComponent;
  let fixture: ComponentFixture<PersonalContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
