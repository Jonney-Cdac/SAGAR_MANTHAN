import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarousalComponent } from './home-carousal.component';

describe('HomeCarousalComponent', () => {
  let component: HomeCarousalComponent;
  let fixture: ComponentFixture<HomeCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarousalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
