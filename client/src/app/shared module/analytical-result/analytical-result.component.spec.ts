import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalResultComponent } from './analytical-result.component';

describe('AnalyticalResultComponent', () => {
  let component: AnalyticalResultComponent;
  let fixture: ComponentFixture<AnalyticalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [AnalyticalResultComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
