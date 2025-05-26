import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCLoadMoreButtonOdata } from './load-more-button-odata.component';

describe('MCLoadMoreButtonOdata', () => {
  let component: MCLoadMoreButtonOdata;
  let fixture: ComponentFixture<MCLoadMoreButtonOdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCLoadMoreButtonOdata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCLoadMoreButtonOdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
