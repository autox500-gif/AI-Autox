import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';

@Component({
  selector: 'app-business-suite',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, BrandLogo],
  template: `
    <div class="h-screen w-full flex flex-col bg-[#1F1F1F] text-[#F5F5F5] select-none overflow-hidden">
      <!-- Top Bar -->
      <header class="h-[64px] px-6 flex items-center justify-between border-b border-[#333333] bg-[#252525]/40 backdrop-blur-md shrink-0 z-20">
        <div class="flex items-center gap-3">
          <button
            (click)="state.setView('main')"
            class="flex items-center gap-2 text-[#BDBDBD] hover:text-white transition-colors cursor-pointer"
            title="Return to Home"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">arrow_back</mat-icon>
          </button>
          <app-brand-logo [size]="'32'" />
          <span class="text-[16px] font-semibold text-[#F5F5F5] capitalize">
            {{ state.currentView() === 'crm' ? 'Auto CRM' : (state.currentView() === 'leads' ? 'Auto Leads' : (state.currentView() === 'caller' ? 'Auto Caller' : (state.currentView() === 'reply' ? 'Auto Reply' : (state.currentView() === 'email' ? 'Auto Email' : (state.currentView() === 'posts' ? 'Auto Posts' : 'Auto Network'))))) }}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <button
            (click)="state.setView('web')"
            class="px-3.5 py-1.5 rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[12px] text-[#BDBDBD] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">language</mat-icon>
            <span>Web Workspace</span>
          </button>
          <button
            (click)="state.openUpgradeModal()"
            class="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2B2B2B] to-[#383838] border border-[#444444] text-[11px] font-bold tracking-wider uppercase text-[#F5F5F5] hover:text-white transition-all cursor-pointer"
          >
            UPGRADE
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-6 max-w-6xl w-full mx-auto space-y-6">
        
        <!-- AUTO CRM VIEW -->
        @if (state.currentView() === 'crm') {
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-light text-white">Autonomous CRM Pipeline</h2>
                <p class="text-[13px] text-[#888888]">Customer lifecycle intelligence with self-driving deal negotiation.</p>
              </div>
              <button (click)="actionTriggered('Synced CRM contacts')" class="h-9 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md">
                <mat-icon class="!w-4 !h-4 !text-[16px]">sync</mat-icon>
                <span>Sync Pipeline</span>
              </button>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Active Pipeline</span>
                <span class="text-2xl font-mono text-white">$248,500</span>
                <span class="text-[11px] text-emerald-400 block mt-1">+18% this week</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Closed Deals</span>
                <span class="text-2xl font-mono text-white">34</span>
                <span class="text-[11px] text-emerald-400 block mt-1">Autonomous close</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Win Probability</span>
                <span class="text-2xl font-mono text-white">88.4%</span>
                <span class="text-[11px] text-neutral-400 block mt-1">AI Verified</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Follow-up Queue</span>
                <span class="text-2xl font-mono text-white">12 Pending</span>
                <span class="text-[11px] text-amber-400 block mt-1">Next in 4 mins</span>
              </div>
            </div>

            <!-- Pipeline Table -->
            <div class="rounded-2xl bg-[#252525] border border-[#333333] overflow-hidden">
              <div class="p-4 border-b border-[#333333] flex items-center justify-between">
                <span class="text-sm font-medium text-white">Key High-Intent Opportunities</span>
                <span class="text-xs text-[#888888]">3 Live Deals</span>
              </div>
              <div class="divide-y divide-[#333333]">
                <div class="p-4 flex items-center justify-between hover:bg-[#2B2B2B] transition-colors">
                  <div>
                    <h4 class="text-sm font-medium text-white">Solaria Energy Systems</h4>
                    <p class="text-xs text-[#888888]">Enterprise Fleet Architecture • $84,000</p>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-mono">Contract In Review</span>
                </div>
                <div class="p-4 flex items-center justify-between hover:bg-[#2B2B2B] transition-colors">
                  <div>
                    <h4 class="text-sm font-medium text-white">Nexus Aerospace Tech</h4>
                    <p class="text-xs text-[#888888]">AI Grounding Suite • $120,000</p>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-mono">Technical Demo Booked</span>
                </div>
                <div class="p-4 flex items-center justify-between hover:bg-[#2B2B2B] transition-colors">
                  <div>
                    <h4 class="text-sm font-medium text-white">Aero Logistics Global</h4>
                    <p class="text-xs text-[#888888]">Autonomous Dispatch API • $44,500</p>
                  </div>
                  <span class="px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-mono">Negotiation Stage</span>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- AUTO LEADS VIEW -->
        @if (state.currentView() === 'leads') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-light text-white">Auto Leads Enrichment</h2>
                <p class="text-[13px] text-[#888888]">Automated intent detection and verified B2B prospect discovery.</p>
              </div>
              <button (click)="actionTriggered('Scraping 50 enriched decision makers')" class="h-9 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md">
                <mat-icon class="!w-4 !h-4 !text-[16px]">radar</mat-icon>
                <span>Find Decision Makers</span>
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                <mat-icon class="!w-6 !h-6 !text-[24px] text-emerald-400 mb-2">verified_user</mat-icon>
                <h3 class="text-sm font-medium text-white mb-1">Direct Work Emails</h3>
                <p class="text-xs text-[#888888]">99.2% deliverability with SMTP ping verification.</p>
              </div>
              <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                <mat-icon class="!w-6 !h-6 !text-[24px] text-blue-400 mb-2">business</mat-icon>
                <h3 class="text-sm font-medium text-white mb-1">Company Tech Stack</h3>
                <p class="text-xs text-[#888888]">Identifies CRM, cloud provider, and payment gateway.</p>
              </div>
              <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                <mat-icon class="!w-6 !h-6 !text-[24px] text-amber-400 mb-2">signal_cellular_alt</mat-icon>
                <h3 class="text-sm font-medium text-white mb-1">Buying Intent Score</h3>
                <p class="text-xs text-[#888888]">Signals from hiring velocity and funding rounds.</p>
              </div>
            </div>
          </div>
        }

        <!-- AUTO CALLER VIEW -->
        @if (state.currentView() === 'caller') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-light text-white">Auto Caller Agent (Ultra-Low Latency)</h2>
              <p class="text-[13px] text-[#888888]">180ms neural conversational voice agent for inbound support & outbound qualification.</p>
            </div>

            <div class="p-6 rounded-2xl bg-[#252525] border border-[#333333] flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div class="w-16 h-16 rounded-full bg-[#2E2E2E] border border-[#444] flex items-center justify-center text-emerald-400 animate-pulse">
                <mat-icon class="!w-8 !h-8 !text-[32px]">phone_in_talk</mat-icon>
              </div>
              <div>
                <h3 class="text-lg font-medium text-white">Agent Persona: Samantha (Enterprise AE)</h3>
                <p class="text-xs text-[#888888] max-w-md mx-auto mt-1">Ready to dial leads or receive inbound web voice queries with zero latency.</p>
              </div>
              <button (click)="actionTriggered('Dispatched test voice call session')" class="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs shadow-lg hover:bg-neutral-200 transition-all">
                Simulate Voice Call
              </button>
            </div>
          </div>
        }

        <!-- POSTS VIEW -->
        @if (state.currentView() === 'posts') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-light text-white">Auto Posts & Viral Copy Engine</h2>
              <p class="text-[13px] text-[#888888]">Generate multi-platform marketing copy, Twitter/X threads, and LinkedIn carousels.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-semibold text-sky-400 font-mono">Twitter / X Thread</span>
                  <span class="text-[10px] text-[#888888]">Ready to publish</span>
                </div>
                <p class="text-xs text-[#D5D5D5] leading-relaxed">
                  "Most businesses fail because they scale human bottlenecks instead of autonomous software loops. Here is the 4-step framework we used to automate $100k/mo with zero employees 🧵👇"
                </p>
              </div>
              <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-xs font-semibold text-blue-400 font-mono">LinkedIn Thought Leadership</span>
                  <span class="text-[10px] text-[#888888]">Ready to publish</span>
                </div>
                <p class="text-xs text-[#D5D5D5] leading-relaxed">
                  "The future of commerce isn't static websites. It's generative storefronts that adapt in real time to each visitor's buying intent. Here's what we learned deploying AutoX to 500+ enterprises..."
                </p>
              </div>
            </div>
          </div>
        }

        <!-- OTHER VIEWS (REPLY, EMAIL, NETWORK, CONNECT) -->
        @if (state.currentView() === 'reply' || state.currentView() === 'email' || state.currentView() === 'network' || state.currentView() === 'connect') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-light text-white capitalize">Auto {{ state.currentView() }} Engine</h2>
              <p class="text-[13px] text-[#888888]">Configured and operating autonomously in the background.</p>
            </div>

            <div class="p-8 rounded-2xl bg-[#252525] border border-[#333333] text-center space-y-3">
              <mat-icon class="!w-10 !h-10 !text-[40px] text-amber-400">check_circle</mat-icon>
              <h3 class="text-base font-medium text-white">System Active & Synchronized</h3>
              <p class="text-xs text-[#888888] max-w-md mx-auto">Connected to AutoX Core engine. Telemetry and event webhooks are streaming nominal status.</p>
              <button (click)="state.setView('web')" class="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs mt-3">
                Open Web Studio
              </button>
            </div>
          </div>
        }

      </div>
    </div>
  `
})
export class BusinessSuite {
  readonly state = inject(WorkspaceState);

  actionTriggered(msg: string) {
    this.state.showToast(msg);
  }
}
