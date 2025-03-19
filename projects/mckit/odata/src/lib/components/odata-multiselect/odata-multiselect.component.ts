import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MCApiRestHttpService } from '@mckit/core';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { debounceTime, of, Subscription, switchMap, tap } from 'rxjs';
import { MCOdata } from '../../entities/mc-odata';

@Component({
    selector: 'mc-odata-multiselect',
    imports: [CommonModule, FormsModule, MultiSelectModule],
    templateUrl: './odata-multiselect.component.html',
    styleUrl: './odata-multiselect.component.css'
})
export class OdataMultiselectComponent implements OnInit {

  value = input<Array<any>>([]);
  placeholder = input<string>('');
  optionValue = input<string>('id');
  optionLabel = input<string>('name');

  onChange = output<MultiSelectChangeEvent>();

  changeDecetor = inject(ChangeDetectorRef);

  httpService?: MCApiRestHttpService<any>;

  data = new MCOdata();

  items: Array<any> = [];
  selectedItemsObjs: Array<any> = [];
  selectedItems = [];

  isLoading = false;

  subscriptionList?: Subscription;

  ngOnInit(): void {
    this.items = this.value();
    this.search('');
  }

  onChangeInternal(event: MultiSelectChangeEvent) {
    this.onChange.emit(event);
  }

  onSelect(data: Array<any>) {
    if(this.selectedItemsObjs.length > data.length){
      this.selectedItemsObjs = this.selectedItemsObjs.filter(item => data.includes(item.id));
    } else {
      this.selectedItemsObjs.push(this.items.find(item => item.id === data[data.length - 1])!);
    }
  }

  search(query: string) {
    if(this.httpService == undefined) {
      return;
    }

    if(this.subscriptionList) {
      this.subscriptionList.unsubscribe();
    }

    this.data.filters.setPostpendContains(this.optionLabel(), query);

    this.items = this.selectedItemsObjs;

    this.subscriptionList = of(debounceTime(300))
    .pipe(
      switchMap(() => this.httpService!.list(this.data.toString())),
      tap((data) => this.items = [...data.data, ...this.selectedItemsObjs.filter(item => !data.data.find(team => team.id === item.id))])
    )
    .subscribe(teams => this.changeDecetor.detectChanges());
  }

  setHttpService(httpService: MCApiRestHttpService<any>) {
    this.httpService = httpService;
  }
}
