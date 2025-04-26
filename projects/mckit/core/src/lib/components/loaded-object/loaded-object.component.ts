import { Component, inject, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MCApiRestHttpService } from '../../services/api-rest-http.service';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap, take, takeWhile, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'mc-loaded-object',
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loaded-object.component.html',
  styleUrl: './loaded-object.component.css'
})
export class MCLoadedObject implements OnInit, OnDestroy {

  key = input<string>('id');

  onLoaded = output<any>();

  httpService = input.required<MCApiRestHttpService<any>>();

  route = inject(ActivatedRoute);

  subscription?: Subscription;

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.processRoute();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  processRoute() {
    this.subscription = this.route.params
    .pipe(
      take(1),
      takeWhile((params) => params[this.key()] != undefined),
      map(params => params[this.key()]),
      tap(() => this.isLoading.set(true)),
      switchMap(objId => this.httpService().get(objId).pipe(take(1))),
    )
    .subscribe(objRes => {
      this.onLoaded.emit(objRes);
      this.isLoading.set(false);
    });
  }
}
