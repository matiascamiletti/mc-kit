import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  Component,
  inject,
  OnInit,
  OnDestroy,
  WritableSignal,
  Input,
} from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrintServiceComponent } from '@mckit/core';
import {
  ID_FOOTER_MC_COMPONENT,
  ID_SIDEBAR_MC_COMPONENT,
  ID_TOPBAR_MC_COMPONENT,
  MCSidebarService,
} from '@mckit/layout-core';

export interface MCSakaiLayoutStyles {
  layoutBg: string;
  layoutBgDark: string;
  topbarBg: string;
  topbarBgDark: string;
  sidebarBg: string;
  sidebarBgDark: string;
  borderColor: string;
  borderColorDark: string;
  topbarHeight: string;
  sidebarWidth: string;
  shadow: string;
}

const DEFAULT_STYLES: MCSakaiLayoutStyles = {
  layoutBg: 'var(--mc-layout-bg)',
  layoutBgDark: 'var(--mc-layout-bg-dark)',
  topbarBg: 'var(--mc-topbar-bg)',
  topbarBgDark: 'var(--mc-topbar-bg-dark)',
  sidebarBg: 'var(--mc-sidebar-bg)',
  sidebarBgDark: 'var(--mc-sidebar-bg-dark)',
  borderColor: 'var(--mc-border-color)',
  borderColorDark: 'var(--mc-border-color-dark)',
  topbarHeight: 'var(--mc-topbar-height)',
  sidebarWidth: 'var(--mc-sidebar-width)',
  shadow: 'var(--mc-shadow)',
};

@Component({
  selector: 'mc-sakai-layout',
  imports: [CommonModule, RouterModule, PrintServiceComponent],
  templateUrl: './sakai-layout.component.html',
  styleUrl: './sakai-layout.component.scss',
})
export class MCSakaiLayoutComponent implements OnInit, OnDestroy {
  @Input() styles: Partial<MCSakaiLayoutStyles> = {};

  private _styles: MCSakaiLayoutStyles = { ...DEFAULT_STYLES };
  sidebarService: MCSidebarService = inject(MCSidebarService);

  get layoutBg(): string {
    return this._styles.layoutBg;
  }
  get layoutBgDark(): string {
    return this._styles.layoutBgDark;
  }
  get topbarBg(): string {
    return this._styles.topbarBg;
  }
  get topbarBgDark(): string {
    return this._styles.topbarBgDark;
  }
  get sidebarBg(): string {
    return this._styles.sidebarBg;
  }
  get sidebarBgDark(): string {
    return this._styles.sidebarBgDark;
  }
  get borderColor(): string {
    return this._styles.borderColor;
  }
  get borderColorDark(): string {
    return this._styles.borderColorDark;
  }
  get topbarHeight(): string {
    return this._styles.topbarHeight;
  }
  get sidebarWidth(): string {
    return this._styles.sidebarWidth;
  }
  get shadow(): string {
    return this._styles.shadow;
  }

  topbarLeftId = ID_TOPBAR_MC_COMPONENT + '_left';
  topbarRightId = ID_TOPBAR_MC_COMPONENT + '_right';

  sidebarId = ID_SIDEBAR_MC_COMPONENT;

  footerId = ID_FOOTER_MC_COMPONENT;

  isDesktop = false;

  isOpen: WritableSignal<boolean> = this.sidebarService.isOpen;

  constructor(private route: ActivatedRoute) {
    afterNextRender(() => {
      this.initSidebar();
    });
  }

  ngOnInit() {
    // Get styles from route data if available
    this.route.data.subscribe((data) => {
      if (data['styles']) {
        this._styles = { ...DEFAULT_STYLES, ...data['styles'], ...this.styles };
      } else {
        this._styles = { ...DEFAULT_STYLES, ...this.styles };
      }
    });

    if (typeof window !== 'undefined') {
      this.isDesktop = window.innerWidth >= 768;
      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }

  onResize = () => {
    this.isDesktop = window.innerWidth >= 768;
  };

  initSidebar() {
    if (!this.isDesktop) {
      this.sidebarService.isOpen.update(() => false);
    }
  }

  closeSidebar() {
    this.sidebarService.isOpen.update(() => false);
  }

  openSidebar() {
    this.sidebarService.isOpen.update(() => true);
  }
}
