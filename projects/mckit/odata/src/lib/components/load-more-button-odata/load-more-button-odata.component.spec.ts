import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCLoadMoreButtonOdata } from './load-more-button-odata.component';
import { MCOdata } from '../../entities/mc-odata';

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
    fixture.componentRef.setInput('initialOdata', new MCOdata());
    fixture.componentRef.setInput('label', 'Load More');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
