import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HottextComponent } from './hottext.component';

describe('HottextComponent', () => {
  let component: HottextComponent;
  let fixture: ComponentFixture<HottextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HottextComponent]
    });
    fixture = TestBed.createComponent(HottextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
