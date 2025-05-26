import { Observable } from "rxjs";
import { MCConfigModalForm } from "./mc-config-modal-form";

export class MCConfigHttpModalForm extends MCConfigModalForm {
  http!: (item: any) => Observable<any>;
}
