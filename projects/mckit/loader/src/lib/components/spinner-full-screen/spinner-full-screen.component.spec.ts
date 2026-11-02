import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCSpinnerFullScreenComponent } from './spinner-full-screen.component';
import { MCLoaderService } from '../../services/loader.service';

describe('MCSpinnerFullScreenComponent', () => {
  let component: MCSpinnerFullScreenComponent;
  let fixture: ComponentFixture<MCSpinnerFullScreenComponent>;
  let loaderService: MCLoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCSpinnerFullScreenComponent],
    }).compileComponents();

    loaderService = TestBed.inject(MCLoaderService);
    fixture = TestBed.createComponent(MCSpinnerFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render full-screen spinner when loading is true', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.full-screen-container')).not.toBeNull();
  });

  it('should hide full-screen spinner when loaderService.hide() is called', () => {
    loaderService.hide();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.full-screen-container')).toBeNull();

    loaderService.show();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.full-screen-container')).not.toBeNull();
  });
});
