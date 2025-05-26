import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCLoadedObject } from './loaded-object.component';

describe('MCLoadedObject', () => {
  let component: MCLoadedObject;
  let fixture: ComponentFixture<MCLoadedObject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCLoadedObject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCLoadedObject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
