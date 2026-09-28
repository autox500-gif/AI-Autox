import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';

@Component({
  selector: 'app-upgrade-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (state.isUpgradeModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 select-none">
        
        <!-- Modal Card: max-width 440px, rounded-32px, background #252525, border 1px solid #3D3D3D, padding 32px -->
        <div class="relative w-full max-w-[440px] rounded-[32px] bg-[#252525] border border-[#3D3D3D] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          
          <!-- Close button: Top-right 36px x 36px circle -->
          <button
            (click)="state.closeUpgradeModal()"
            class="absolute top-6 right-6 w-[36px] h-[36px] rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            title="Close"
            aria-label="Close upgrade dialog"
          >
            <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
          </button>

          <!-- Icon badge: 64px x 64px rounded square -->
          <div class="w-[64px] h-[64px] rounded-[18px] bg-gradient-to-br from-amber-500/20 via-orange-600/20 to-transparent border border-amber-500/30 flex items-center justify-center mb-6 shadow-inner">
            <mat-icon class="!w-8 !h-8 !text-[32px] text-amber-400">workspace_premium</mat-icon>
          </div>

          <!-- Heading: "Upgrade Plan" (24px) -->
          <h2 class="text-[24px] font-[400] text-[#F5F5F5] tracking-tight mb-2">
            Upgrade Plan
          </h2>
          <p class="text-[13px] text-[#BDBDBD] leading-relaxed mb-6">
            Unlock infinite autonomous capabilities, instant custom domain deploys, and ultra-low latency voice caller engines.
          </p>

          <!-- Plan selector toggle -->
          <div class="flex items-center justify-between p-1 bg-[#1F1F1F] rounded-xl border border-[#333333] mb-6">
            <button
              (click)="isAnnual.set(false)"
              [class.bg-[#333333]]="!isAnnual()"
              [class.text-white]="!isAnnual()"
              [class.text-[#888888]]="isAnnual()"
              class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            >
              Monthly ($49/mo)
            </button>
            <button
              (click)="isAnnual.set(true)"
              [class.bg-[#333333]]="isAnnual()"
              [class.text-white]="isAnnual()"
              [class.text-[#888888]]="!isAnnual()"
              class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1"
            >
              <span>Annual ($39/mo)</span>
              <span class="text-[10px] text-amber-400 font-bold uppercase">Save 20%</span>
            </button>
          </div>

          <!-- Feature Bullets -->
          <div class="space-y-3 mb-8">
            <div class="flex items-center gap-3 text-xs text-[#E0E0E0]">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-400">check_circle</mat-icon>
              <span>Unlimited Full-Stack Web & 3D Graphics Generation</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-[#E0E0E0]">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-400">check_circle</mat-icon>
              <span>Autonomous AI Voice Caller (1,000 mins/month)</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-[#E0E0E0]">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-400">check_circle</mat-icon>
              <span>Automated B2B Lead Enrichment & CRM Sync</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-[#E0E0E0]">
              <mat-icon class="!w-4 !h-4 !text-[16px] text-emerald-400">check_circle</mat-icon>
              <span>Priority Cloud Deploy & Dedicated Support</span>
            </div>
          </div>

          <!-- Call to action button -->
          <button
            (click)="confirmUpgrade()"
            class="w-full h-[48px] rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-98"
          >
            <span>Upgrade to AutoX Pro</span>
            <mat-icon class="!w-4 !h-4 !text-[18px]">arrow_forward</mat-icon>
          </button>

          <p class="text-[11px] text-[#757575] text-center mt-3">Cancel anytime. 14-day money-back guarantee.</p>
        </div>

      </div>
    }
  `
})
export class UpgradeModal {
  readonly state = inject(WorkspaceState);
  readonly isAnnual = signal<boolean>(true);

  confirmUpgrade() {
    this.state.showToast('Upgraded to AutoX Pro! All limits unlocked.');
    this.state.closeUpgradeModal();
  }
}
