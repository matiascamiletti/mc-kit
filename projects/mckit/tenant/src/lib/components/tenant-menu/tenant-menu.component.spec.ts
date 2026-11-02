import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { MCTenantMenu, TenantMenuComponent } from './tenant-menu.component';
import { MCTenantService } from '../../services/tenant.service';
import { MCTenant } from '../../entities/mc_tenant';

describe('TenantMenuComponent', () => {
  let component: TenantMenuComponent;
  let fixture: ComponentFixture<TenantMenuComponent>;
  let mockTenantService: jasmine.SpyObj<MCTenantService>;
  let currentTenant$: BehaviorSubject<MCTenant | undefined>;
  const tenantA: MCTenant = { id: 1, name: 'Tenant A' };
  const tenantB: MCTenant = { id: 2, name: 'Tenant B' };

  beforeEach(async () => {
    currentTenant$ = new BehaviorSubject<MCTenant | undefined>(tenantA);
    mockTenantService = jasmine.createSpyObj<MCTenantService>('MCTenantService', [
      'list',
      'getCurrent',
      'clickTenant',
      'clickNew',
      'clickCurrent'
    ]);
    mockTenantService.getCurrent.and.returnValue(currentTenant$.asObservable());
    mockTenantService.list.and.returnValue(of({ data: [tenantA, tenantB] }));

    await TestBed.configureTestingModule({
      imports: [TenantMenuComponent],
      providers: [
        provideNoopAnimations(),
        { provide: MCTenantService, useValue: mockTenantService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantMenuComponent);
    component = fixture.componentInstance;
    component.component = new MCTenantMenu(true);
    fixture.detectChanges();
  });

  it('should create and load current tenant and tenant list', () => {
    expect(component).toBeTruthy();
    expect(component.current()).toEqual(tenantA);
    expect(component.isLoading()).toBeFalse();
    expect(component.items().length).toBe(3);
    expect(component.items()[2].label).toBe('New tenant');
  });

  it('should trigger clickTenant and clickNew commands from menu items', () => {
    const items = component.items();
    items[0].command!({} as any);
    expect(mockTenantService.clickTenant).toHaveBeenCalledWith(tenantA);

    items[2].command!({} as any);
    expect(mockTenantService.clickNew).toHaveBeenCalled();
  });

  it('should not include New tenant option when allowNewTenant is false', () => {
    component.component = new MCTenantMenu(false);
    component.loadAllTenants();
    expect(component.items().length).toBe(2);
  });

  it('should call tenantService.clickCurrent on onClickCurrent()', () => {
    component.onClickCurrent();
    expect(mockTenantService.clickCurrent).toHaveBeenCalledWith(tenantA);
  });

  it('should unsubscribe on destroy', () => {
    const unsubSpy = spyOn(component.currentSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});
