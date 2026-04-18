import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  Signal,
  viewChild,
  OnInit,
  inject,
  Optional,
  HostListener,
  PLATFORM_ID,
  Inject,
  DestroyRef,
} from '@angular/core';
import { AdvancedFiltersPanelComponent } from '../advanced-filters-panel/advanced-filters-panel.component';
import { QuickFilterPanelComponent } from '../quick-filter-panel/quick-filter-panel.component';
import { MCFilter, MCTypeFilter } from '../../entities/filter';
import { MCResultFilter } from '../../entities/result';
import { MCConfigFilter } from '../../entities/config';
import { MCItemFilter } from '../../entities/item-filter';
import { Popover, PopoverModule } from 'primeng/popover';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FilterStore, MCFilterStore } from '../../stores/filter.store';
import { MCFilterTypePanel } from '../../entities/type-panel';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { takeWhile, tap } from 'rxjs';
import { StorageMap } from '@ngx-pwa/local-storage';


@Component({
  selector: 'mc-filter-panel',
  imports: [
    CommonModule,
    PopoverModule,
    DialogModule,
    AdvancedFiltersPanelComponent,
    QuickFilterPanelComponent,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css',
})
export class MCFilterPanelComponent implements OnInit {

  overlayPanel: Signal<Popover> = viewChild.required('overlayPanel');
  dialog: Signal<Dialog> = viewChild.required('dialog');

  filterNavigationService = inject(MCFilterNavigationService);
  storageService = inject(StorageMap);

  eTypePanel = MCFilterTypePanel;
  typePanel = signal<MCFilterTypePanel>(MCFilterTypePanel.BASIC);

  destroyRef = inject(DestroyRef);

  config = input.required<MCConfigFilter>();
  storageKey = input<string | undefined>(undefined);

  filterStorage = signal<MCFilterStore | undefined>(undefined);

  platformId = inject(PLATFORM_ID);

  onUpdateActive = output<number>();

  isMobile = signal<boolean>(false);
  dialogVisible = signal<boolean>(false);

  onChange = output<Array<MCResultFilter>>();

  ngOnInit() {
    this.checkScreenSize();
    this.loadNavigation();
    this.initStorage();
  }

  emitChanges() {
    this.onChange.emit(this.filterStorage()?.getResults() ?? []);

    if (this.isMobile()) {
      this.dialogVisible.set(false);
    } else {
      this.overlayPanel().hide();
    }
  }

  updateActives(total: number) {
    this.onUpdateActive.emit(total);
  }

  initStorage() {
    const storage = new MCFilterStore(this.storageKey(), this.storageService, this.config().filters);

    this.filterStorage.set(storage);
    if (this.filterStorage()?.hasQuickFilters()) {
      this.typePanel.set(MCFilterTypePanel.BASIC);
    } else {
      this.typePanel.set(MCFilterTypePanel.ADVANCED);
    }

    storage.getOnInit()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((init) => {
          if (init) {
            this.updateActives(this.filterStorage()?.getResults().length ?? 0);
            this.emitChanges();
          }
        })
      )
      .subscribe();

    storage.getOnApply()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((results) => {
          this.updateActives(results.length);
          this.emitChanges();
        })
      )
      .subscribe();
  }

  loadNavigation() {
    this.filterNavigationService.getTypePanelObs()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((typePanel) => {
          this.typePanel.set(typePanel);
        })
      )
      .subscribe();
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < 768);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  toggle($event: any): void {
    if (this.isMobile()) {
      this.dialogVisible.set(true);
    } else {
      this.overlayPanel().toggle($event);
    }
  }

}
