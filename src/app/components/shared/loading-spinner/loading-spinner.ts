import { Component, OnInit, OnDestroy, input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-loading-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSpinnerModule],
  template: `
    <ngx-spinner
      [name]="spinnerId"
      type="ball-clip-rotate-pulse"
      size="medium"
      color="#1a3a5c"
      bdColor="transparent"
      [fullScreen]="false"
    >
      @if (label()) {
        <p class="ls-label">{{ label() }}</p>
      }
    </ngx-spinner>
    <div class="ls-spacer"></div>
  `,
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner implements OnInit, OnDestroy {
  label = input<string>('');

  readonly spinnerId = `ls-${Math.random().toString(36).slice(2, 8)}`;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show(this.spinnerId);
  }

  ngOnDestroy(): void {
    this.spinner.hide(this.spinnerId);
  }
}

