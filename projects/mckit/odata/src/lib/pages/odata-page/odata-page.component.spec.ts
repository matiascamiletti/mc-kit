import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCOdataPage } from './odata-page.component';

describe('MCOdataPage', () => {
  let component: MCOdataPage;
  let fixture: ComponentFixture<MCOdataPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCOdataPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCOdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
