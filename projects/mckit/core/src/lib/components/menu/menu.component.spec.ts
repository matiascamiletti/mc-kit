import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MCItemMenu, MCMenu, MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let items: MCItemMenu[];

  beforeEach(async () => {
    items = [
      { label: 'Home', icon: 'pi pi-home', link: '/home' },
      { label: 'Docs', icon: 'pi pi-book', externalLink: 'https://example.com', children: [{ label: 'Sub' }] }
    ];

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    component.component = new MCMenu(items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items with internal and external links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Home');
    expect(links[1].getAttribute('href')).toBe('https://example.com');
    expect(links[1].textContent).toContain('Docs');
  });

  it('should call onClickItem when a link is clicked', () => {
    const spy = spyOn(component, 'onClickItem').and.callThrough();
    const firstLink: HTMLElement = fixture.nativeElement.querySelector('a');
    firstLink.click();
    expect(spy).toHaveBeenCalledWith(items[0]);
  });

  it('should instantiate MCItemMenu with default empty label', () => {
    const item = new MCItemMenu();
    expect(item.label).toBe('');
  });
});
