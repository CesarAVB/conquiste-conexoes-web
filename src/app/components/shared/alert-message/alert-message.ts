import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.scss'
})
export class AlertMessageComponent {
  @Input() message = '';
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';

  get iconClass(): string {
    const icons: Record<string, string> = {
      success: 'fas fa-check-circle',
      danger: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };
    return icons[this.type];
  }
}