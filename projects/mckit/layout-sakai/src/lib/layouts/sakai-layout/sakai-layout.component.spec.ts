import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MCSakaiLayoutComponent } from './sakai-layout.component';

describe('SakaiLayoutComponent', () => {
  let component: MCSakaiLayoutComponent;
  let fixture: ComponentFixture<MCSakaiLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSakaiLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MCSakaiLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
