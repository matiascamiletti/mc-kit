import { TestBed } from '@angular/core/testing';
import { McComponentService } from './mc-component.service';
import { MCSubtitle } from '../components/subtitle/subtitle.component';

describe('McComponentService', () => {
  let service: McComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and get components by id', () => {
    const comp1 = new MCSubtitle('One');
    const comp2 = new MCSubtitle('Two');

    service.addComponent('slot-1', comp1);
    service.addComponent('slot-1', comp2);

    expect(service.getComponents('slot-1')).toEqual([comp1, comp2]);
  });

  it('should overwrite components with setComponents', () => {
    const comp1 = new MCSubtitle('One');
    const comp2 = new MCSubtitle('Two');

    service.addComponent('slot-1', comp1);
    service.setComponents('slot-1', [comp2]);

    expect(service.getComponents('slot-1')).toEqual([comp2]);
  });

  it('should delete components for a given id', () => {
    service.addComponent('slot-1', new MCSubtitle('One'));
    service.deleteComponents('slot-1');

    expect(service.getComponents('slot-1')).toBeUndefined();
    expect(service.getIds()).not.toContain('slot-1');
  });

  it('should return all registered ids and clear all components', () => {
    service.addComponent('slot-a', new MCSubtitle('A'));
    service.addComponent('slot-b', new MCSubtitle('B'));

    expect(service.getIds()).toEqual(['slot-a', 'slot-b']);

    service.clear();
    expect(service.getIds()).toEqual([]);
    expect(service.getComponents('slot-a')).toBeUndefined();
  });
});
