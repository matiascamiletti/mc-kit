import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCActionsColumn } from './actions-column.component';

describe('MCActionsColumn', () => {
  let component: MCActionsColumn;
  let fixture: ComponentFixture<MCActionsColumn>;
  const mockItem = { id: 10, name: 'Row 10' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCActionsColumn]
    }).compileComponents();

    fixture = TestBed.createComponent(MCActionsColumn);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onEdit and onRemove with item when clicked', () => {
    const editSpy = spyOn(component.onEdit, 'emit');
    const removeSpy = spyOn(component.onRemove, 'emit');

    component.onClickEdit();
    expect(editSpy).toHaveBeenCalledWith(mockItem);

    component.onClickRemove();
    expect(removeSpy).toHaveBeenCalledWith(mockItem);
  });

  it('should hide edit or remove buttons when hasEdit/hasRemove is false', () => {
    expect(fixture.nativeElement.querySelectorAll('p-button').length).toBe(2);

    fixture.componentRef.setInput('hasEdit', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('p-button').length).toBe(1);

    fixture.componentRef.setInput('hasRemove', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('p-button').length).toBe(0);
  });
});
