import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardHomeComponent } from './standard-home.component';

describe('StandardHomeComponent', () => {
  let component: StandardHomeComponent;
  let fixture: ComponentFixture<StandardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [StandardHomeComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
