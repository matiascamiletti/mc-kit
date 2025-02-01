import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSplitPageComponent } from './split-page.component';

describe('MCSplitPageComponent', () => {
  let component: MCSplitPageComponent;
  let fixture: ComponentFixture<MCSplitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSplitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSplitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
