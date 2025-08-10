import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsFieldComponent } from './tags-field.component';

describe('TagsFieldComponent', () => {
  let component: TagsFieldComponent;
  let fixture: ComponentFixture<TagsFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
