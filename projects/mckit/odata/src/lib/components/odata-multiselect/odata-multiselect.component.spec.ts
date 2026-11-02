import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { OdataMultiselectComponent } from './odata-multiselect.component';

describe('OdataMultiselectComponent', () => {
  let component: OdataMultiselectComponent;
  let fixture: ComponentFixture<OdataMultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdataMultiselectComponent],
      providers: [provideNoopAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdataMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search using httpService and merge selectedItemsObjs', () => {
    const mockHttpService = {
      list: jasmine.createSpy('list').and.returnValue(
        of({ data: [{ id: 1, name: 'Team A' }, { id: 2, name: 'Team B' }] })
      )
    } as any;

    component.selectedItemsObjs = [{ id: 3, name: 'Team C' }];
    component.setHttpService(mockHttpService);
    component.search('Team');

    expect(mockHttpService.list).toHaveBeenCalled();
    expect(component.items.length).toBe(3);
  });

  it('should handle onSelect and onChangeInternal', () => {
    component.items = [
      { id: 1, name: 'Team A' },
      { id: 2, name: 'Team B' }
    ];

    component.onSelect([1]);
    expect(component.selectedItemsObjs).toEqual([{ id: 1, name: 'Team A' }]);

    component.onSelect([1, 2]);
    expect(component.selectedItemsObjs.length).toBe(2);

    component.onSelect([2]);
    expect(component.selectedItemsObjs).toEqual([{ id: 2, name: 'Team B' }]);

    const changeSpy = spyOn(component.onChange, 'emit');
    const event = { originalEvent: new Event('change'), value: [2] };
    component.onChangeInternal(event);
    expect(changeSpy).toHaveBeenCalledWith(event);
  });
});
