import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageComponent, MCImage } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.component = new MCImage('https://example.com/photo.jpg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render img with src and 100% width by default', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://example.com/photo.jpg');
    expect(img.style.width).toBe('100%');
  });

  it('should render img with specified pixel width', () => {
    component.component = new MCImage('https://example.com/photo.jpg', 250);
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.style.width).toBe('250px');
  });
});
