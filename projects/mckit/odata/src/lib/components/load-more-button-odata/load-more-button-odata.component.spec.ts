import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCLoadMoreButtonOdata } from './load-more-button-odata.component';
import { MCOdata } from '../../entities/mc-odata';

describe('MCLoadMoreButtonOdata', () => {
  let component: MCLoadMoreButtonOdata;
  let fixture: ComponentFixture<MCLoadMoreButtonOdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCLoadMoreButtonOdata]
    }).compileComponents();

    fixture = TestBed.createComponent(MCLoadMoreButtonOdata);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('initialOdata', new MCOdata());
    fixture.componentRef.setInput('label', 'Load More');
    fixture.detectChanges();
  });

  it('should create and clone initialOdata', () => {
    expect(component).toBeTruthy();
    expect(component.odata).toBeTruthy();
    expect(component.isShow()).toBeTrue();
  });

  it('should emit clickMore on onClick and update skip and isShow via setResult', () => {
    let emittedPayload: any;
    component.clickMore.subscribe((payload) => (emittedPayload = payload));

    component.onClick();
    expect(component.isLoading()).toBeTrue();
    expect(emittedPayload).toBeTruthy();

    emittedPayload.setResult({ data: [{ id: 1 }, { id: 2 }], total: 3 });
    expect(component.odata.skip).toBe(2);
    expect(component.isShow()).toBeTrue();
    expect(component.isLoading()).toBeFalse();

    emittedPayload.setResult({ data: [{ id: 3 }], total: 3 });
    expect(component.odata.skip).toBe(3);
    expect(component.isShow()).toBeFalse();
  });
});
