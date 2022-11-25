import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmdacHomeBodyComponent } from './mmdac-home-body.component';

describe('MmdacHomeBodyComponent', () => {
  let component: MmdacHomeBodyComponent;
  let fixture: ComponentFixture<MmdacHomeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmdacHomeBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmdacHomeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
