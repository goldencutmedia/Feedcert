import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskforceHomeComponent } from './taskforce-home.component';

describe('TaskforceHomeComponent', () => {
  let component: TaskforceHomeComponent;
  let fixture: ComponentFixture<TaskforceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [TaskforceHomeComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskforceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
