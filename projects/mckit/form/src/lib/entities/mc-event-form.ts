export class MCEventForm {
  key!: string;
  content: any;

  static init(key: string, content?: any): MCEventForm {
    let eventForm = new MCEventForm();
    eventForm.key = key;
    eventForm.content = content;
    return eventForm;
  }
}
