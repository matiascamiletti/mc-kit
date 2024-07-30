import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MCLoaderService } from '../../services/loader.service';

@Component({
  selector: 'mc-spinner-full-screen',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './spinner-full-screen.component.html',
  styleUrl: './spinner-full-screen.component.css'
})
export class MCSpinnerFullScreenComponent {
  loaderService = inject(MCLoaderService);

  isLoading = this.loaderService.isLoading;
}
