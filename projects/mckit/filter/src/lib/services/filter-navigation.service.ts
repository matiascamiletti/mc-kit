import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MCFilterTypePanel } from '../entities/type-panel';

@Injectable({
    providedIn: 'root'
})
export class MCFilterNavigationService {

    typePanelSubject = new BehaviorSubject<MCFilterTypePanel>(MCFilterTypePanel.BASIC);

    getTypePanelObs(): Observable<MCFilterTypePanel> {
        return this.typePanelSubject.asObservable();
    }

    getTypePanel(): MCFilterTypePanel {
        return this.typePanelSubject.value;
    }

    setTypePanel(typePanel: MCFilterTypePanel) {
        this.typePanelSubject.next(typePanel);
    }

    setBasicPanel() {
        this.setTypePanel(MCFilterTypePanel.BASIC);
    }

    setAdvancedPanel() {
        this.setTypePanel(MCFilterTypePanel.ADVANCED);
    }
}
