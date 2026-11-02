import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCTopbarService } from '@mckit/layout-core';
import { MCSubtitleInTopbar, SubtitleInTopbarComponent } from './subtitle-in-topbar.component';

describe('SubtitleInTopbarComponent', () => {
  let component: SubtitleInTopbarComponent;
  let fixture: ComponentFixture<SubtitleInTopbarComponent>;
  let topbarService: MCTopbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleInTopbarComponent]
    })
    .compileComponents();

    topbarService = TestBed.inject(MCTopbarService);
    topbarService.subtitle.set('');

    fixture = TestBed.createComponent(SubtitleInTopbarComponent);
    component = fixture.componentInstance;
    component.component = new MCSubtitleInTopbar('Topbar Heading');
  });

  it('should create and set topbar subtitle from config when empty', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(topbarService.subtitle()).toBe('Topbar Heading');

    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toBe('Topbar Heading');
  });

  it('should not overwrite topbar subtitle if already set', () => {
    topbarService.subtitle.set('Existing Topbar Subtitle');
    fixture.detectChanges();

    expect(topbarService.subtitle()).toBe('Existing Topbar Subtitle');
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toBe('Existing Topbar Subtitle');
  });
});
