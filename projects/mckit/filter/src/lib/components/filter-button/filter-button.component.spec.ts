import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { MCFilterButton } from './filter-button.component';
import { MCFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';

describe('MCFilterButton', () => {
  let component: MCFilterButton;
  let fixture: ComponentFixture<MCFilterButton>;

  beforeEach(async () => {
    const storageSpy = jasmine.createSpyObj('StorageMap', ['get', 'set', 'delete']);
    storageSpy.get.and.returnValue(of(undefined));
    storageSpy.set.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [MCFilterButton],
      providers: [
        provideNoopAnimations(),
        { provide: StorageMap, useValue: storageSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MCFilterButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', {
      filters: [MCFilter.text({ title: 'Name', key: 'name' })]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update total and compute severity', () => {
    component.updateTotal(0);
    expect(component.total()).toBe('');
    expect(component.severity()).toBe('secondary');

    component.updateTotal(3);
    expect(component.total()).toBe('3');
    expect(component.severity()).toBe('primary');
  });

  it('should emit change when onChange is called', () => {
    const changeSpy = spyOn(component.change, 'emit');
    const results = [new MCResultFilter()];
    component.onChange(results);
    expect(changeSpy).toHaveBeenCalledWith(results);
  });
});
