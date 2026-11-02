import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCAuthHalfComponent } from './auth-half.component';

describe('MCAuthHalfComponent', () => {
  let component: MCAuthHalfComponent;
  let fixture: ComponentFixture<MCAuthHalfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCAuthHalfComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MCAuthHalfComponent);
    component = fixture.componentInstance;
    component.config = {
      title: 'Half Login',
      image: 'https://example.com/banner.png'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and image from config', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    const img = fixture.nativeElement.querySelector('img');
    expect(h1.textContent).toContain('Half Login');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/banner.png');
  });

  it('should not render image if undefined in config', () => {
    component.config = { title: 'No Image' };
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
  });
});
