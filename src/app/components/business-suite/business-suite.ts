import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';
import { CrmDeal, LeadItem, PostItem } from '../../models/workspace.types';

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
            {{ titleForCurrentView() }}
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
                <p class="text-[13px] text-[#888888]">Customer lifecycle intelligence with automated pipeline tracking.</p>
              </div>
              <div class="flex items-center gap-2">
                <button (click)="addNewDeal()" class="h-9 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-neutral-200 transition-all cursor-pointer">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                  <span>New Deal</span>
                </button>
              </div>
            </div>

            <!-- Stats Row -->
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Active Pipeline</span>
                <span class="text-2xl font-mono text-white">{{ totalPipelineValue() }}</span>
                <span class="text-[11px] text-[#888888] block mt-1">Live tracking</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Total Deals</span>
                <span class="text-2xl font-mono text-white">{{ state.crmDeals().length }}</span>
                <span class="text-[11px] text-[#888888] block mt-1">In pipeline</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Win Probability</span>
                <span class="text-2xl font-mono text-white">{{ state.crmDeals().length > 0 ? '75%' : '0%' }}</span>
                <span class="text-[11px] text-[#888888] block mt-1">Algorithmic estimate</span>
              </div>
              <div class="p-4 rounded-2xl bg-[#252525] border border-[#333333]">
                <span class="text-[11px] text-[#888888] uppercase block mb-1">Follow-up Queue</span>
                <span class="text-2xl font-mono text-white">{{ state.crmDeals().length > 0 ? '1 Pending' : '0 Pending' }}</span>
                <span class="text-[11px] text-[#888888] block mt-1">Automated sequence</span>
              </div>
            </div>

            <!-- Pipeline Table -->
            <div class="rounded-2xl bg-[#252525] border border-[#333333] overflow-hidden">
              <div class="p-4 border-b border-[#333333] flex items-center justify-between">
                <span class="text-sm font-medium text-white">Opportunities</span>
                <span class="text-xs text-[#888888]">{{ state.crmDeals().length }} Registered</span>
              </div>

              @if (state.crmDeals().length > 0) {
                <div class="divide-y divide-[#333333]">
                  @for (deal of state.crmDeals(); track deal.id) {
                    <div class="p-4 flex items-center justify-between hover:bg-[#2B2B2B] transition-colors">
                      <div>
                        <h4 class="text-sm font-medium text-white">{{ deal.company }}</h4>
                        <p class="text-xs text-[#888888]">{{ deal.name }} • {{ deal.value }}</p>
                      </div>
                      <span class="px-3 py-1 rounded-full bg-[#333333] text-neutral-300 text-xs font-mono">{{ deal.stage }}</span>
                    </div>
                  }
                </div>
              } @else {
                <div class="p-10 text-center text-xs text-[#888888]">
                  No deals in pipeline. Click "New Deal" to register your first opportunity.
                </div>
              }
            </div>
          </div>
        }

        <!-- AUTO LEADS VIEW -->
        @if (state.currentView() === 'leads') {
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-light text-white">Auto Leads Enrichment</h2>
                <p class="text-[13px] text-[#888888]">Automated intent detection and verified B2B prospect discovery.</p>
              </div>
              <div class="flex items-center gap-2">
                <button (click)="searchNewLeads()" class="h-9 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-neutral-200 transition-all cursor-pointer">
                  <mat-icon class="!w-4 !h-4 !text-[16px]">radar</mat-icon>
                  <span>Discover Leads</span>
                </button>
              </div>
            </div>

            <!-- Leads List -->
            <div class="rounded-2xl bg-[#252525] border border-[#333333] overflow-hidden">
              <div class="p-4 border-b border-[#333333] flex items-center justify-between">
                <span class="text-sm font-medium text-white">Discovered Prospects</span>
                <span class="text-xs text-[#888888]">{{ state.leadsList().length }} Enriched</span>
              </div>

              @if (state.leadsList().length > 0) {
                <div class="divide-y divide-[#333333]">
                  @for (lead of state.leadsList(); track lead.id) {
                    <div class="p-4 flex items-center justify-between hover:bg-[#2B2B2B] transition-colors">
                      <div>
                        <h4 class="text-sm font-medium text-white">{{ lead.name }}</h4>
                        <p class="text-xs text-[#888888]">{{ lead.title }} at {{ lead.company }} • {{ lead.email }}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-mono text-emerald-400">Score: {{ lead.score }}</span>
                        <span class="px-2.5 py-0.5 rounded-full bg-[#333333] text-neutral-300 text-[11px]">{{ lead.status }}</span>
                      </div>
                    </div>
                  }
                </div>
              } @else {
                <div class="p-10 text-center text-xs text-[#888888]">
                  No prospects enriched yet. Click "Discover Leads" to start lead discovery.
                </div>
              }
            </div>
          </div>
        }

        <!-- AUTO CALLER VIEW -->
        @if (state.currentView() === 'caller') {
          <div class="space-y-6">
            <div>
              <h2 class="text-2xl font-light text-white">Auto Caller Agent</h2>
              <p class="text-[13px] text-[#888888]">Ultra-low latency conversational voice AI for outbound qualification and inbound support.</p>
            </div>

            <div class="p-8 rounded-2xl bg-[#252525] border border-[#333333] flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div class="w-16 h-16 rounded-full bg-[#2E2E2E] border border-[#444] flex items-center justify-center text-[#BDBDBD]">
                <mat-icon class="!w-8 !h-8 !text-[32px]">phone_in_talk</mat-icon>
              </div>
              <div>
                <h3 class="text-lg font-medium text-white">Voice Agent Standby</h3>
                <p class="text-xs text-[#888888] max-w-md mx-auto mt-1">
                  Ready to connect call sessions. Provide a recipient number or campaign prompt to initiate dispatch.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center gap-2 max-w-sm w-full pt-2">
                <input
                  #phoneInput
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  class="h-10 px-3.5 rounded-xl bg-[#1E1E1E] border border-[#3D3D3D] text-xs text-white placeholder-[#666] outline-none w-full"
                />
                <button
                  (click)="startCall(phoneInput)"
                  class="h-10 px-5 rounded-xl bg-white text-black font-semibold text-xs whitespace-nowrap shadow-md hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  Start Call
                </button>
              </div>
            </div>
          </div>
        }

        <!-- POSTS VIEW -->
        @if (state.currentView() === 'posts') {
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-2xl font-light text-white">Auto Posts & Content Engine</h2>
                <p class="text-[13px] text-[#888888]">Generate multi-platform campaigns, product launches, and social updates.</p>
              </div>
              <button (click)="createPostPrompt()" class="h-9 px-4 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-neutral-200 transition-all cursor-pointer">
                <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                <span>Draft Post</span>
              </button>
            </div>

            <!-- Posts List -->
            @if (state.postsList().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                @for (post of state.postsList(); track post.id) {
                  <div class="p-5 rounded-2xl bg-[#252525] border border-[#333333]">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs font-semibold text-neutral-300 font-mono">{{ post.platform }}</span>
                      <span class="text-[10px] text-[#888888]">{{ post.status }}</span>
                    </div>
                    <p class="text-xs text-[#D5D5D5] leading-relaxed">{{ post.content }}</p>
                  </div>
                }
              </div>
            } @else {
              <div class="p-10 rounded-2xl bg-[#252525] border border-[#333333] text-center text-xs text-[#888888]">
                No marketing copy generated yet. Click "Draft Post" or enter a prompt to create campaigns.
              </div>
            }
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
              <mat-icon class="!w-10 !h-10 !text-[40px] text-neutral-500">settings_input_component</mat-icon>
              <h3 class="text-base font-medium text-white">Engine Configured</h3>
              <p class="text-xs text-[#888888] max-w-md mx-auto">
                No active automation tasks running. Connect your credentials or enter instructions to dispatch.
              </p>
              <button (click)="state.setView('web')" class="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs mt-3 cursor-pointer">
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

  titleForCurrentView(): string {
    switch (this.state.currentView()) {
      case 'crm': return 'Auto CRM';
      case 'leads': return 'Auto Leads';
      case 'caller': return 'Auto Caller';
      case 'reply': return 'Auto Reply';
      case 'email': return 'Auto Email';
      case 'posts': return 'Auto Posts';
      case 'network': return 'Auto Network';
      case 'connect': return 'Auto Connect';
      default: return 'Business Suite';
    }
  }

  totalPipelineValue(): string {
    const deals = this.state.crmDeals();
    if (deals.length === 0) return '$0.00';
    return `$${deals.length * 15},000`;
  }

  addNewDeal() {
    const count = this.state.crmDeals().length + 1;
    const newDeal: CrmDeal = {
      id: `deal-${Date.now()}`,
      name: `Account Executive Contact #${count}`,
      company: `Client Organization #${count}`,
      stage: 'Initial Contact',
      value: '$25,000'
    };
    this.state.crmDeals.update(list => [newDeal, ...list]);
    this.state.showToast('Created new CRM deal');
  }

  searchNewLeads() {
    const count = this.state.leadsList().length + 1;
    const newLead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: `Lead Prospect ${count}`,
      company: `Global Technologies ${count}`,
      title: 'VP Operations',
      email: `contact${count}@global-tech.io`,
      score: 85 + (count % 15),
      status: 'Verified'
    };
    this.state.leadsList.update(list => [newLead, ...list]);
    this.state.showToast('Enriched 1 verified prospect');
  }

  startCall(input: HTMLInputElement) {
    const phone = input.value.trim();
    if (!phone) {
      this.state.showToast('Please enter a phone number');
      return;
    }
    this.state.showToast(`Dialing session initiated: ${phone}`);
    input.value = '';
  }

  createPostPrompt() {
    const count = this.state.postsList().length + 1;
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      platform: 'LinkedIn',
      content: `Autonomous growth insight #${count}: Structuring workflows around real-time software loops rather than manual tasks.`,
      status: 'Draft',
      timestamp: 'Just now'
    };
    this.state.postsList.update(list => [newPost, ...list]);
    this.state.showToast('Drafted new post');
  }
}
