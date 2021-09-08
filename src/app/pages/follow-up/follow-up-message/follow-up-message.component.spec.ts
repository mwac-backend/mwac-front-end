import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpMessageComponent } from './follow-up-message.component';

describe('FollowUpMessageComponent', () => {
  let component: FollowUpMessageComponent;
  let fixture: ComponentFixture<FollowUpMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
