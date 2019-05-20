import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDailogComponent } from './form-dailog.component';

describe('FormDailogComponent', () => {
  let component: FormDailogComponent;
  let fixture: ComponentFixture<FormDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
