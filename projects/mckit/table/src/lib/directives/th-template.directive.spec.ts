import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MCThTemplateDirective } from './th-template.directive';

@Component({
  standalone: true,
  imports: [MCThTemplateDirective],
  template: `<ng-template [mcThTemplate]="'headerField'">Header cell</ng-template>`
})
class TestThHostComponent {
  directive = viewChild.required(MCThTemplateDirective);
}

describe('MCThTemplateDirective', () => {
  it('should create an instance and return field name', async () => {
    await TestBed.configureTestingModule({
      imports: [TestThHostComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TestThHostComponent);
    fixture.detectChanges();
    const dir = fixture.componentInstance.directive();
    expect(dir).toBeTruthy();
    expect(dir.getFieldName()).toBe('headerField');
    expect(dir.template).toBeTruthy();
  });
});
