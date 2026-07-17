import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { FirebaseService } from '../../../core/firebase/firebase.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl" style="max-width: 600px;">
        <h1 class="display-5 font-weight-black mb-2">Get in touch</h1>
        <p class="text-secondary mb-5">Have a tool suggestion, found a bug, or want to collaborate? Send us a message.</p>

        @if (submitted()) {
          <div class="alert alert-success p-4 rounded-3 shadow-sm text-center mb-5">
            <i class="bi bi-envelope-check-fill fs-1 text-success mb-3 d-block"></i>
            <h4 class="fw-bold mb-2">Message Sent Successfully!</h4>
            <p class="text-secondary small m-0">Thank you for reaching out. We will get back to you as soon as possible.</p>
          </div>
        } @else {
          <form (submit)="sendMessage()" class="premium-card p-4 d-flex flex-column gap-3">
            <div>
              <label for="name" class="form-label small fw-bold text-secondary">Name</label>
              <input type="text" id="name" class="form-control" [(ngModel)]="name" name="name" required placeholder="John Doe">
            </div>
            
            <div>
              <label for="email" class="form-label small fw-bold text-secondary">Email Address</label>
              <input type="email" id="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="john@example.com">
            </div>
            
            <div>
              <label for="subject" class="form-label small fw-bold text-secondary">Subject</label>
              <input type="text" id="subject" class="form-control" [(ngModel)]="subject" name="subject" required placeholder="Tool suggestion / Bug report">
            </div>
            
            <div>
              <label for="message" class="form-label small fw-bold text-secondary">Message</label>
              <textarea id="message" class="form-control" rows="5" [(ngModel)]="message" name="message" required placeholder="Describe your query..."></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 py-3 rounded-pill mt-2">
              <i class="bi bi-send-fill me-2"></i>Send Message
            </button>
          </form>
        }
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    .form-control {
      background: var(--bg-primary);
      border-color: var(--border-color);
      color: var(--text-primary);
      border-radius: 10px;
      
      &:focus {
        background: var(--bg-secondary);
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      border: none;
      font-weight: 600;
      
      &:hover {
        background: linear-gradient(135deg, #4f46e5, #4338ca);
      }
    }
  `]
})
export class ContactComponent {
  toastService = inject(ToastService);
  private firebaseService = inject(FirebaseService);
  
  name = '';
  email = '';
  subject = '';
  message = '';
  
  submitted = signal<boolean>(false);

  async sendMessage() {
    if (!this.name || !this.email || !this.subject || !this.message) {
      this.toastService.show('Please fill in all required fields.', 'danger');
      return;
    }
    
    try {
      await this.firebaseService.submitContact(this.name, this.email, this.subject, this.message);
      this.submitted.set(true);
      this.toastService.show('Your message was sent successfully!', 'success');
    } catch (e) {
      this.toastService.show('Failed to send message. Please try again.', 'danger');
    }
  }
}
