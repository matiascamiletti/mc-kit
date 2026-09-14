import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRoundedComponent } from './card-rounded.component';

describe('CardRoundedComponent', () => {
  let component: CardRoundedComponent;
  let fixture: ComponentFixture<CardRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRoundedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRoundedComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
