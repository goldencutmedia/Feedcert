import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingFormComponent } from './rating-form.component';

describe('RankingFormComponent', () => {
  let component: RankingFormComponent;
  let fixture: ComponentFixture<RankingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [RankingFormComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
