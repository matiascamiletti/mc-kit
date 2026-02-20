import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MCFieldComponent } from '../mc-field.component';
import { MCField } from '../../entities/mc-field';
import { MCIftaField } from '../../entities/mc-ifta-field';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'mc-ifta-password-field',
    imports: [CommonModule, ReactiveFormsModule, IftaLabelModule, PasswordModule, ButtonModule],
    templateUrl: './ifta-password-field.component.html',
    styleUrl: './ifta-password-field.component.css'
})
export class IftaPasswordFieldComponent extends MCFieldComponent {

    generatePassword() {
        const specials = "!@#$%^&*()-_=+";
        const numbers = "0123456789";
        const lowers = "abcdefghijklmnopqrstuvwxyz";
        const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const charset = lowers + uppers + numbers + specials;

        let password = "";
        password += lowers.charAt(Math.floor(Math.random() * lowers.length));
        password += uppers.charAt(Math.floor(Math.random() * uppers.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += specials.charAt(Math.floor(Math.random() * specials.length));

        for (let i = 0; i < 12; ++i) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        this.control()?.setValue(password);
        this.control()?.markAsDirty();
    }
}

export class IftaPasswordField {

    static init(key: string | undefined, label: string, config?: {
        validators?: ValidatorFn[],
        default_value?: any,
        disabled?: boolean,
        extra?: any
    }): MCField {
        return MCIftaField.init({
            key: key,
            component: IftaPasswordFieldComponent,
            label: label,
            validators: config?.validators,
            default_value: config?.default_value,
            disabled: config?.disabled,
            extra: config?.extra
        });
    }

}
