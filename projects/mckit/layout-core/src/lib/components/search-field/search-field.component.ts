import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageMap } from '@ngx-pwa/local-storage';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'mc-search-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.css'
})
export class MCSearchField implements OnInit, OnDestroy {
  key = input<string>();
  hasStorage = input<boolean>(true);
  placeholder = input<string>('Search...');

  onSearch = output<string>();

  isLoading = signal<boolean>(false);

  storageService = inject(StorageMap);

  input = new FormControl<string>('');
  inputSubscription?: Subscription;

  ngOnInit(): void {
    this.loadInput();
    this.loadStorage();
  }

  ngOnDestroy(): void {
    this.inputSubscription?.unsubscribe();
  }

  stopLoading() {
    this.isLoading.set(false);
  }

  loadInput() {
    this.inputSubscription = this.input.valueChanges
    .pipe(debounceTime(300))
    .subscribe((value: string|null) => {
      this.isLoading.set(true);
      this.onSearch.emit(value ?? '');
      this.saveStorage(value);
    });
  }

  saveStorage(query: string|null) {
    if(this.key() == undefined || this.key() == '' || this.hasStorage() == false) {
      return;
    }

    this.storageService.set(this.getKey(), query).subscribe(() => {});
  }

  loadStorage() {
    if(this.key() == undefined || this.key() == '' || this.hasStorage() == false) {
      return;
    }

    this.storageService.get(this.getKey())
    .subscribe((value: any) => {
      this.input.setValue(value);
    });
  }

  getKey(): string {
    return this.key() + '_search';
  }
}
