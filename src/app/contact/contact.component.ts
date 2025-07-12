import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  imports:[ReactiveFormsModule,NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      workType: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const whatsappMessage = this.generateWhatsAppMessage(formData);
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.location.href = `https://wa.me/919005975579?text=${encodedMessage}`;
    }
  }

  private generateWhatsAppMessage(data: any): string {
    let message = `Hi, my name is ${data.name}.\n\n`;
    message += `Here are my details:\n`;
    message += `📱 Phone: ${data.phone}\n`;
    message += `📧 Email: ${data.email}\n`;
    message += `💼 Work Type: ${data.workType}\n`;
    
    if (data.description) {
      message += `\nDescription:\n${data.description}\n`;
    }
    
    return message;
  }
}