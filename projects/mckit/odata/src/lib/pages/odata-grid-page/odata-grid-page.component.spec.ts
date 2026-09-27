import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCOdataGridPage } from './odata-grid-page.component';

describe('MCOdataGridPage', () => {
  let component: MCOdataGridPage;
  let fixture: ComponentFixture<MCOdataGridPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCOdataGridPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MCOdataGridPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
