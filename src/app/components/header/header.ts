import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, BrandLogo],
  template: `
    <header class="fixed top-0 left-0 right-0 h-[80px] px-6 sm:px-10 z-20 flex items-center justify-between pointer-events-none">
      <!-- Left Group -->
      <div class="flex items-center gap-3.5 pointer-events-auto">
        <button
          (click)="state.setView('main')"
          class="flex items-center gap-3.5 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 rounded-full"
          title="AutoX Home"
        >
          <app-brand-logo [size]="'40'" />
          <span class="text-[20px] font-medium tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
            AutoX
          </span>
        </button>

        <button
          (click)="state.openUpgradeModal()"
          class="h-[28px] sm:h-[30px] px-3 rounded-full bg-gradient-to-r from-[#2B2B2B] to-[#383838] border border-[#444444] text-[11px] font-bold tracking-wider uppercase text-[#F5F5F5] hover:border-[#666666] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 flex items-center gap-1.5"
          title="Upgrade your plan"
        >
          <span>UPGRADE</span>
        </button>
      </div>

      <!-- Right Group: Mobile Hamburger Button -->
      <div class="flex items-center gap-3 pointer-events-auto md:hidden">
        <button
          (click)="state.toggleMobileDrawer()"
          class="w-[40px] h-[40px] rounded-[12px] bg-[#2B2B2B] border border-[#3D3D3D] text-[#F5F5F5] flex items-center justify-center hover:bg-[#383838] active:scale-95 transition-all shadow-sm cursor-pointer"
          title="Open Menu"
          aria-label="Toggle navigation drawer"
        >
          <!-- Staggered hamburger icon -->
          <div class="flex flex-col gap-1.5 w-5 items-end">
            <span class="h-[2px] w-5 bg-[#F5F5F5] rounded-full"></span>
            <span class="h-[2px] w-3.5 bg-[#F5F5F5] rounded-full"></span>
            <span class="h-[2px] w-4.5 bg-[#F5F5F5] rounded-full"></span>
          </div>
        </button>
      </div>
    </header>
  `
})
export class AppHeader {
  readonly state = inject(WorkspaceState);
}
