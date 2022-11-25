import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmigrantListComponent } from './emigrant-list.component';

describe('EmigrantListComponent', () => {
  let component: EmigrantListComponent;
  let fixture: ComponentFixture<EmigrantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmigrantListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmigrantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
