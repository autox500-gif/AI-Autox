import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="containerClass()"
      class="relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#252525] border border-[#3D3D3D] ring-2 ring-[#333333]/50 transition-all duration-300"
    >
      @if (!hasError()) {
        <img
          [src]="logoUrl"
          alt="AutoX Logo"
          referrerpolicy="no-referrer"
          (error)="onError()"
          class="w-full h-full object-cover rounded-full"
        />
      } @else {
        <!-- Fallback sleek geometric prism triangle icon -->
        <svg viewBox="0 0 24 24" class="w-3/5 h-3/5 text-[#F5F5F5]" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M12 2L2 22h20L12 2z" stroke-linejoin="round" stroke-linecap="round" />
          <path d="M12 6.5L5.5 19.5h13L12 6.5z" stroke-linejoin="round" stroke-linecap="round" stroke-opacity="0.6" />
        </svg>
      }
    </div>
  `
})
export class BrandLogo {
  readonly size = input<'32' | '40' | '56'>('40');
  readonly logoUrl = 'https://yu3rh9hejbczr3dy.public.blob.vercel-storage.com/Screenshot_20260823_000356_Instagram.jpg';
  readonly hasError = signal<boolean>(false);

  containerClass(): string {
    switch (this.size()) {
      case '32':
        return 'w-[32px] h-[32px]';
      case '56':
        return 'w-[56px] h-[56px]';
      case '40':
      default:
        return 'w-[40px] h-[40px]';
    }
  }

  onError() {
    this.hasError.set(true);
  }
}
