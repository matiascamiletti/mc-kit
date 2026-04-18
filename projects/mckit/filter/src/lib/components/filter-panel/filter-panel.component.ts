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
import { FilterStore } from '../../stores/filter.store';
import { MCFilterTypePanel } from '../../entities/type-panel';
import { MCFilterNavigationService } from '../../services/filter-navigation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';


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

  filterNavigationService = inject(MCFilterNavigationService);

  eTypePanel = MCFilterTypePanel;
  typePanel = signal<MCFilterTypePanel>(MCFilterTypePanel.BASIC);

  destroyRef = inject(DestroyRef);

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



  overlayPanel: Signal<Popover> = viewChild.required('overlayPanel');
  dialog: Signal<Dialog> = viewChild.required('dialog');

  config = input.required<MCConfigFilter>();
  updateTotal = output<number>();

  isMobile = signal<boolean>(false);
  dialogVisible = signal<boolean>(false);

  quickFilters = computed(() =>
    this.config().filters.filter((f) => f.isQuickFilter)
  );

  results = signal<Array<MCResultFilter>>([]);

  change = output<Array<MCResultFilter>>();

  resultsBeforeLenght = 0;

  private filterStore = inject(FilterStore, { optional: true });
  private platformId = inject(PLATFORM_ID);



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
    effect(() => {
      if (this.quickFilters().length > 0) {
        this.typePanel.set(MCFilterTypePanel.BASIC);
      } else {
        this.typePanel.set(MCFilterTypePanel.ADVANCED);
      }
    });
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile.set(window.innerWidth < 768);
    }
  }

  ngOnInit() {
    this.loadNavigation();
    // First try to load filters from the FilterStore if there is a configured storage key
    if (this.filterStore && this.filterStore.storageKey()) {
      this.filterStore.loadFilters(this.config().filters);
      if (this.filterStore.hasFilters()) {
        this.results.set([...this.filterStore.filters()]);
        this.update();
        this.emit();
        return;
      }
    }

    // If there are no filters in the FilterStore, use the initial filters from the configuration
    const currentConfig = this.config();
    const initialFilters = currentConfig?.initialFilters;
    if (
      initialFilters &&
      Array.isArray(initialFilters) &&
      initialFilters.length > 0
    ) {
      this.results.set([...initialFilters]);
      this.update();
      this.emit();
    }
  }

  addResult(result: MCResultFilter): void {
    this.results.set([...this.results(), result]);
    this.update();
  }

  addResultQuick(result: MCResultFilter): void {
    this.results.set([...this.results(), result]);
    this.update();
    this.emit();
  }

  removeResultByIndex(index: number): void {
    this.results.set(this.results().filter((_, i) => i !== index));
    this.update();
  }

  removeResultByFilter(filter: MCFilter): void {
    this.results.set(this.results().filter((r) => r.filter !== filter));
    this.update();
  }

  removeResultByFilterAndItem(data: {
    filter: MCFilter;
    item: MCItemFilter;
  }): void {
    this.results.set(
      this.results().filter((r) => {
        if (r.filter !== data.filter) {
          return true;
        }

        return r.value !== data.item.value;
      })
    );
    this.update();
  }

  update() {
    this.updateTotal.emit(this.results().length);
  }

  emit() {
    let validFilters = this.results().filter((r) => MCResultFilter.isValid(r));
    if (this.resultsBeforeLenght == 0 && validFilters.length == 0) {
      return;
    }

    this.resultsBeforeLenght = validFilters.length;
    this.change.emit(validFilters);

    if (this.isMobile()) {
      this.dialogVisible.set(false);
    } else {
      this.overlayPanel().hide();
    }
  }

  toggle($event: any): void {
    if (this.isMobile()) {
      this.dialogVisible.set(true);
    } else {
      this.overlayPanel().toggle($event);
    }
  }

  clickClearAll(): void {
    this.results.set([]);
    this.update();
    this.emit();
  }
}
