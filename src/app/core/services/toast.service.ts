import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success', duration = 3000) {
    const id = this.nextId++;
    const toast: Toast = { id, message, type };
    this.toasts.update(current => [...current, toast]);
    setTimeout(() => this.remove(id), duration);
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
