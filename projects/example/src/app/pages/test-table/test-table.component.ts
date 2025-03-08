import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MCNavigationService } from '@mckit/layout-core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-test-table',
    imports: [CommonModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule],
    templateUrl: './test-table.component.html',
    styleUrl: './test-table.component.scss'
})
export class TestTableComponent implements OnInit {

  navigationService = inject(MCNavigationService);
  router = inject(Router);

  data = [
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
    { id: 10, name: 'Name 1', price: 30, category: 'City 1' },
  ];

  ngOnInit(): void {
    this.navigationService.isMain.set(false);
    this.navigationService.onBack
    .subscribe(() => {
      this.router.navigate(['/fuse']);
      this.navigationService.isMain.set(true);
    });
  }
}
