import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmigrantModalFormComponent } from './emigrant-modal-form.component';

describe('EmigrantModalFormComponent', () => {
  let component: EmigrantModalFormComponent;
  let fixture: ComponentFixture<EmigrantModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmigrantModalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmigrantModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
