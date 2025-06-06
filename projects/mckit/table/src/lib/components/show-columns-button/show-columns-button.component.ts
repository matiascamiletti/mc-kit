import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MCColumn } from '@mckit/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'mc-show-columns-button',
  imports: [CommonModule, FormsModule, MultiSelectModule],
  templateUrl: './show-columns-button.component.html',
  styleUrl: './show-columns-button.component.css'
})
export class ShowColumnsButton implements OnInit {

  key = input<string>();
  hasStorage = input<boolean>(true);

  initialColumns = input.required<Array<MCColumn>>();

  onSelected = output<Array<MCColumn>>();

  storageService = inject(StorageMap);

  selectedColumns?: Array<MCColumn>;

  ngOnInit(): void {
    this.selectedColumns = this.initialColumns().filter(column => column.isShow);
    this.onSelected.emit(this.selectedColumns ?? []);
    this.loadStorage();
  }

  setSelectedColumns(columnsSelected: Array<MCColumn>) {
    this.selectedColumns = this.initialColumns().filter(column => columnsSelected.some(c => c.field == column.field));
  }

  columnsChange(event: MultiSelectChangeEvent) {
    this.saveStorage();
    this.onSelected.emit(this.selectedColumns ?? []);
  }

  saveStorage() {
    if(this.key() == undefined || this.key() == '' || this.hasStorage() == false) {
      return;
    }

    this.storageService.set(this.getKey(), JSON.stringify(this.selectedColumns), { type: 'string' }).subscribe(() => {});
  }

  loadStorage() {
    if(this.key() == undefined || this.key() == '' || this.hasStorage() == false) {
      return;
    }

    this.storageService.get(this.getKey(), { type: 'string' })
    .subscribe((value: any) => {
      if(value){
        this.setSelectedColumns(JSON.parse(value));
        this.onSelected.emit(this.selectedColumns ?? []);
      }
    });
  }

  getKey(): string {
    return this.key() + '_selected_columns';
  }
}
