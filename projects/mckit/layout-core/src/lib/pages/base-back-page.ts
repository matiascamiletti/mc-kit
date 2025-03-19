import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MCNavigationService } from '../services/navigation.service';

@Component({
    selector: 'mc-base-back-page',
    imports: [],
    template: '',
})
export abstract class MCBaseBackPage implements OnInit, OnDestroy {

  navigationService = inject(MCNavigationService);

  router = inject(Router);

  onBackSubscription?: Subscription;

  abstract onBackRoute: string;

  ngOnInit(): void {
    this.navigationService.isMain.set(false);
    this.navigationService.onBack.subscribe(res => {
      this.router.navigateByUrl(this.onBackRoute);
      this.navigationService.isMain.set(true);
    });
  }

  ngOnDestroy() {
    if(this.onBackSubscription){
      this.onBackSubscription.unsubscribe();
    }
  }

}
