import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MCTdTemplateDirective } from './td-template.directive';

@Component({
  standalone: true,
  imports: [MCTdTemplateDirective],
  template: `<ng-template [mcTdTemplate]="'status'">Status cell</ng-template>`
})
class TestTdHostComponent {
  directive = viewChild.required(MCTdTemplateDirective);
}

describe('MCTdTemplateDirective', () => {
  it('should create an instance and return field name', async () => {
    await TestBed.configureTestingModule({
      imports: [TestTdHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestTdHostComponent);
    fixture.detectChanges();
    const dir = fixture.componentInstance.directive();
    expect(dir).toBeTruthy();
    expect(dir.getFieldName()).toBe('status');
    expect(dir.template).toBeTruthy();
  });
});
