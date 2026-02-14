import { Component, input } from '@angular/core';
import { MCMessageChat } from '../entities/message';

@Component({
    selector: 'mc-base-message',
    template: ''
})
export class MCBaseMessageComponent {
    message = input.required<MCMessageChat>();
}
