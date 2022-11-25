import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmigrantComponent } from './emigrant.component';

describe('EmigrantComponent', () => {
  let component: EmigrantComponent;
  let fixture: ComponentFixture<EmigrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmigrantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmigrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
