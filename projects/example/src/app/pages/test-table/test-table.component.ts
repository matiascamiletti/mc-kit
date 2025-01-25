import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-test-table',
    imports: [CommonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
    templateUrl: './test-table.component.html',
    styleUrl: './test-table.component.scss'
})
export class TestTableComponent {

  data = [
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
  ];
}
