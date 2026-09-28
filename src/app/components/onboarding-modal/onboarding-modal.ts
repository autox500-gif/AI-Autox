import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-onboarding-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule, BrandLogo],
  template: `
    @if (state.isOnboardingModalOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F1F1F]/90 backdrop-blur-md animate-in fade-in duration-200 select-none">
        
        <!-- Centered Card: width: 440px, border-radius: 32px, background: #2B2B2B, padding: 32px -->
        <div class="relative w-full max-w-[440px] rounded-[32px] bg-[#2B2B2B] border border-[#3D3D3D] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
          
          <!-- Close button -->
          <button
            (click)="state.closeOnboardingModal()"
            class="absolute top-6 right-6 w-[36px] h-[36px] rounded-full bg-[#252525] hover:bg-[#333333] border border-[#3D3D3D] text-[#888888] hover:text-white flex items-center justify-center transition-all cursor-pointer"
            title="Close"
          >
            <mat-icon class="!w-4 !h-4 !text-[18px]">close</mat-icon>
          </button>

          <!-- Round logo frame at top: 56px x 56px -->
          <div class="flex justify-center mb-6">
            <app-brand-logo [size]="'56'" />
          </div>

          <!-- Step Indicators -->
          <div class="flex items-center justify-center gap-2 mb-6">
            <span class="w-8 h-1 rounded-full transition-colors" [class.bg-white]="state.onboardingStep() >= 1" [class.bg-[#444]]="state.onboardingStep() < 1"></span>
            <span class="w-8 h-1 rounded-full transition-colors" [class.bg-white]="state.onboardingStep() >= 2" [class.bg-[#444]]="state.onboardingStep() < 2"></span>
            <span class="w-8 h-1 rounded-full transition-colors" [class.bg-white]="state.onboardingStep() >= 3" [class.bg-[#444]]="state.onboardingStep() < 3"></span>
          </div>

          <!-- STEP 1: Sign in / Sign up form fields -->
          @if (state.onboardingStep() === 1) {
            <div>
              <h3 class="text-[22px] font-[400] text-center text-[#F5F5F5] tracking-tight mb-1">Welcome to AutoX</h3>
              <p class="text-[13px] text-center text-[#BDBDBD] mb-6">Sign in or set up your workspace credentials.</p>

              <form [formGroup]="authForm" (ngSubmit)="nextStep()" class="space-y-3.5">
                <div>
                  <label for="onboarding-full-name" class="text-[11px] font-semibold uppercase text-[#888888] block mb-1">Full Name</label>
                  <input
                    id="onboarding-full-name"
                    type="text"
                    formControlName="fullName"
                    placeholder="Prathamesh"
                    class="w-full h-[44px] px-3.5 rounded-[12px] bg-[#222222] border border-[#3D3D3D] text-[13px] text-[#F5F5F5] placeholder-[#666666] outline-none focus:border-[#777777] transition-colors"
                  />
                </div>

                <div>
                  <label for="onboarding-email" class="text-[11px] font-semibold uppercase text-[#888888] block mb-1">Email</label>
                  <input
                    id="onboarding-email"
                    type="email"
                    formControlName="email"
                    placeholder="autox500@gmail.com"
                    class="w-full h-[44px] px-3.5 rounded-[12px] bg-[#222222] border border-[#3D3D3D] text-[13px] text-[#F5F5F5] placeholder-[#666666] outline-none focus:border-[#777777] transition-colors"
                  />
                </div>

                <div>
                  <label for="onboarding-password" class="text-[11px] font-semibold uppercase text-[#888888] block mb-1">Password</label>
                  <input
                    id="onboarding-password"
                    type="password"
                    formControlName="password"
                    placeholder="••••••••••••"
                    class="w-full h-[44px] px-3.5 rounded-[12px] bg-[#222222] border border-[#3D3D3D] text-[13px] text-[#F5F5F5] placeholder-[#666666] outline-none focus:border-[#777777] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full h-[46px] rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-[13px] mt-4 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <span>Continue</span>
                  <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                </button>
              </form>
            </div>
          }

          <!-- STEP 2: Permissions Toggles -->
          @if (state.onboardingStep() === 2) {
            <div>
              <h3 class="text-[22px] font-[400] text-center text-[#F5F5F5] tracking-tight mb-1">Permissions & Access</h3>
              <p class="text-[13px] text-center text-[#BDBDBD] mb-6">Configure hardware and synchronization settings.</p>

              <div class="space-y-3 mb-6">
                <!-- Microphone Toggle -->
                <div class="p-3.5 rounded-[16px] bg-[#242424] border border-[#3D3D3D] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">mic</mat-icon>
                    <div>
                      <p class="text-[13px] font-medium text-[#F5F5F5]">Microphone Access</p>
                      <p class="text-[11px] text-[#888888]">Voice typing and conversational caller agent</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    (click)="micEnabled.set(!micEnabled())"
                    [class.bg-emerald-500]="micEnabled()"
                    [class.bg-[#444]]="!micEnabled()"
                    class="w-11 h-6 rounded-full relative transition-colors cursor-pointer"
                  >
                    <span
                      [class.translate-x-5]="micEnabled()"
                      [class.translate-x-0.5]="!micEnabled()"
                      class="inline-block w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5"
                    ></span>
                  </button>
                </div>

                <!-- Local Storage Toggle -->
                <div class="p-3.5 rounded-[16px] bg-[#242424] border border-[#3D3D3D] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">save</mat-icon>
                    <div>
                      <p class="text-[13px] font-medium text-[#F5F5F5]">Local State Persistence</p>
                      <p class="text-[11px] text-[#888888]">Cache workspaces & graphics for instant load</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    (click)="localStorageEnabled.set(!localStorageEnabled())"
                    [class.bg-emerald-500]="localStorageEnabled()"
                    [class.bg-[#444]]="!localStorageEnabled()"
                    class="w-11 h-6 rounded-full relative transition-colors cursor-pointer"
                  >
                    <span
                      [class.translate-x-5]="localStorageEnabled()"
                      [class.translate-x-0.5]="!localStorageEnabled()"
                      class="inline-block w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5"
                    ></span>
                  </button>
                </div>

                <!-- Cloud Backup Toggle -->
                <div class="p-3.5 rounded-[16px] bg-[#242424] border border-[#3D3D3D] flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">cloud_sync</mat-icon>
                    <div>
                      <p class="text-[13px] font-medium text-[#F5F5F5]">Autonomous Cloud Backup</p>
                      <p class="text-[11px] text-[#888888]">Automatic version snapshots & restore</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    (click)="cloudBackupEnabled.set(!cloudBackupEnabled())"
                    [class.bg-emerald-500]="cloudBackupEnabled()"
                    [class.bg-[#444]]="!cloudBackupEnabled()"
                    class="w-11 h-6 rounded-full relative transition-colors cursor-pointer"
                  >
                    <span
                      [class.translate-x-5]="cloudBackupEnabled()"
                      [class.translate-x-0.5]="!cloudBackupEnabled()"
                      class="inline-block w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5"
                    ></span>
                  </button>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <button
                  (click)="state.onboardingStep.set(1)"
                  class="h-[44px] px-4 rounded-full bg-[#242424] hover:bg-[#2F2F2F] border border-[#3D3D3D] text-[13px] text-[#BDBDBD] hover:text-white transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  (click)="state.onboardingStep.set(3)"
                  class="flex-1 h-[44px] rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <span>Continue</span>
                  <mat-icon class="!w-4 !h-4 !text-[16px]">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          }

          <!-- STEP 3: Terms acceptance & "Get Started" confirmation button -->
          @if (state.onboardingStep() === 3) {
            <div>
              <h3 class="text-[22px] font-[400] text-center text-[#F5F5F5] tracking-tight mb-1">Final Confirmation</h3>
              <p class="text-[13px] text-center text-[#BDBDBD] mb-6">Review terms and launch your AI Business Workspace.</p>

              <div class="p-4 rounded-[16px] bg-[#242424] border border-[#3D3D3D] space-y-2 mb-6 text-[12px] text-[#BDBDBD]">
                <p>✔ Autonomous AI engine calibrated for high-throughput business creation</p>
                <p>✔ Realtime voice caller and lead qualification ready</p>
                <p>✔ Full-stack web and code export privileges granted</p>
              </div>

              <label class="flex items-start gap-3 p-2 rounded-xl hover:bg-[#252525] cursor-pointer mb-6 transition-colors">
                <input
                  type="checkbox"
                  [checked]="termsAccepted()"
                  (change)="termsAccepted.set(!termsAccepted())"
                  class="mt-1 w-4 h-4 rounded bg-[#222] border-[#444] text-white focus:ring-0 cursor-pointer"
                />
                <span class="text-[12px] text-[#BDBDBD] leading-relaxed select-none">
                  I accept the AutoX Autonomous Workspace Terms of Service and Privacy Standards.
                </span>
              </label>

              <div class="flex items-center gap-3">
                <button
                  (click)="state.onboardingStep.set(2)"
                  class="h-[46px] px-4 rounded-full bg-[#242424] hover:bg-[#2F2F2F] border border-[#3D3D3D] text-[13px] text-[#BDBDBD] hover:text-white transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  (click)="finishOnboarding()"
                  [disabled]="!termsAccepted()"
                  [class.opacity-50]="!termsAccepted()"
                  [class.cursor-not-allowed]="!termsAccepted()"
                  class="flex-1 h-[46px] rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-[13px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Get Started</span>
                  <mat-icon class="!w-4 !h-4 !text-[16px]">rocket_launch</mat-icon>
                </button>
              </div>
            </div>
          }

        </div>

      </div>
    }
  `
})
export class OnboardingModal {
  readonly state = inject(WorkspaceState);

  readonly authForm = new FormGroup({
    fullName: new FormControl('Prathamesh', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('autox500@gmail.com', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('••••••••••••', { nonNullable: true, validators: [Validators.required] })
  });

  readonly micEnabled = signal<boolean>(true);
  readonly localStorageEnabled = signal<boolean>(true);
  readonly cloudBackupEnabled = signal<boolean>(true);
  readonly termsAccepted = signal<boolean>(true);

  nextStep() {
    this.state.onboardingStep.set(2);
  }

  finishOnboarding() {
    if (!this.termsAccepted()) return;
    this.state.showToast('Workspace initialized! Welcome to AutoX.');
    this.state.closeOnboardingModal();
  }
}
