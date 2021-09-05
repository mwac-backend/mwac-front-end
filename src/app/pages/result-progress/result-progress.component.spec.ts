import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultProgressComponent } from './result-progress.component';

describe('ResultProgressComponent', () => {
  let component: ResultProgressComponent;
  let fixture: ComponentFixture<ResultProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
