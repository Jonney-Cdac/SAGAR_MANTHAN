import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmigrantLoginComponent } from './emigrant-login.component';

describe('EmigrantLoginComponent', () => {
  let component: EmigrantLoginComponent;
  let fixture: ComponentFixture<EmigrantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmigrantLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmigrantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
