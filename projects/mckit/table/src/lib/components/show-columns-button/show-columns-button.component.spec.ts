import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColumnsButton } from './show-columns-button.component';

describe('ShowColumnsButton', () => {
  let component: ShowColumnsButton;
  let fixture: ComponentFixture<ShowColumnsButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowColumnsButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowColumnsButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
