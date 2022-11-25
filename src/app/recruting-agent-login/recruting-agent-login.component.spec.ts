import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecrutingAgentLoginComponent } from './recruting-agent-login.component';

describe('RecrutingAgentLoginComponent', () => {
  let component: RecrutingAgentLoginComponent;
  let fixture: ComponentFixture<RecrutingAgentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecrutingAgentLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecrutingAgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
