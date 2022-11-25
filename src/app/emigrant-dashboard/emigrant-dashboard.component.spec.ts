import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmigrantDashboardComponent } from './emigrant-dashboard.component';

describe('EmigrantDashboardComponent', () => {
  let component: EmigrantDashboardComponent;
  let fixture: ComponentFixture<EmigrantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmigrantDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmigrantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
