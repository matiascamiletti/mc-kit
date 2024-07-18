export class MCComponent {
  id?: string|string[];
  component: any;
  config: any;

  constructor(comp: any) {
    this.component = comp;
  }
}
