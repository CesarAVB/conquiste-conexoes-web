import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private hot = inject(HotToastService);

  success(message: string): void {
    this.hot.success(message);
  }

  error(message: string): void {
    this.hot.error(message);
  }

  warning(message: string): void {
    this.hot.warning(message);
  }

  info(message: string): void {
    this.hot.info(message);
  }
}
