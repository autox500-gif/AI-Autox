import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';
import { ApiEndpoint } from '../../models/workspace.types';

@Component({
  selector: 'app-web-workspace',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, BrandLogo],
  template: `
    <div class="h-screen w-full flex flex-col bg-[#1F1F1F] text-[#F5F5F5] select-none overflow-hidden">
      
      <!-- ================= 1. Top Adjustable Navigation Bar (64px) ================= -->
      <!-- Height 64px, border bottom 1px solid #333333, background rgba(37, 37, 37, 0.4) backdrop-blur -->
      <nav class="h-[64px] px-4 sm:px-6 flex items-center justify-between border-b border-[#333333] bg-[#252525]/40 backdrop-blur-md shrink-0 z-20">
        
        <!-- Left: Circular logo button (32px) acting as Back to Home, with label "AutoX" -->
        <button
          (click)="state.setView('main')"
          class="flex items-center gap-3 group cursor-pointer focus:outline-none"
          title="Back to Home"
        >
          <app-brand-logo [size]="'32'" />
          <div class="flex items-center gap-1.5">
            <span class="text-[16px] font-medium tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">AutoX</span>
            <span class="text-[12px] text-[#888888] font-mono hidden sm:inline">/ Web Studio</span>
          </div>
        </button>

        <!-- Center Segmented Tabs: Order: Preview -> Backend -> Code -->
        <!-- Pill Container: Background #1F1F1F, border 1px solid #3D3D3D, padding 4px, rounded 10px -->
        <div class="flex items-center p-1 bg-[#1F1F1F] border border-[#3D3D3D] rounded-[10px] shadow-inner">
          <button
            (click)="state.webActiveTab.set('preview')"
            [class.bg-[#3D3D3D]]="state.webActiveTab() === 'preview'"
            [class.text-white]="state.webActiveTab() === 'preview'"
            [class.shadow-sm]="state.webActiveTab() === 'preview'"
            [class.text-[#888888]]="state.webActiveTab() !== 'preview'"
            class="h-[36px] px-4 sm:px-6 rounded-[8px] text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">visibility</mat-icon>
            <span>Preview</span>
          </button>

          <button
            (click)="state.webActiveTab.set('backend')"
            [class.bg-[#3D3D3D]]="state.webActiveTab() === 'backend'"
            [class.text-white]="state.webActiveTab() === 'backend'"
            [class.shadow-sm]="state.webActiveTab() === 'backend'"
            [class.text-[#888888]]="state.webActiveTab() !== 'backend'"
            class="h-[36px] px-4 sm:px-6 rounded-[8px] text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">storage</mat-icon>
            <span>Backend</span>
          </button>

          <button
            (click)="state.webActiveTab.set('code')"
            [class.bg-[#3D3D3D]]="state.webActiveTab() === 'code'"
            [class.text-white]="state.webActiveTab() === 'code'"
            [class.shadow-sm]="state.webActiveTab() === 'code'"
            [class.text-[#888888]]="state.webActiveTab() !== 'code'"
            class="h-[36px] px-4 sm:px-6 rounded-[8px] text-[13px] sm:text-[14px] font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">code</mat-icon>
            <span>Code</span>
          </button>
        </div>

        <!-- Right: GitHub icon button (36px x 36px circle) and Download icon button (36px x 36px circle) -->
        <div class="flex items-center gap-2.5">
          <button
            (click)="exportToGithub()"
            class="w-[36px] h-[36px] rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Export repository to GitHub"
            aria-label="GitHub export"
          >
            <!-- GitHub SVG Icon -->
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </button>

          <button
            (click)="downloadZip()"
            class="w-[36px] h-[36px] rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Download workspace ZIP"
            aria-label="Download project"
          >
            <mat-icon class="!w-4 !h-4 !text-[18px]">download</mat-icon>
          </button>
        </div>
      </nav>

      <!-- ================= Workspace Main Body ================= -->
      <div class="flex-1 flex overflow-hidden relative">

        <!-- ================= 2. Left Collapsible & Resizable Sidebar ================= -->
        <!-- Default Width: 280px, min 240px, max 500px -->
        <aside
          [style.width.px]="isLeftSidebarCollapsed() ? 0 : state.webSidebarWidth()"
          class="h-full bg-[#212121] border-r border-[#333333] flex flex-col shrink-0 overflow-hidden transition-[width] duration-150 relative z-10"
        >
          @if (!isLeftSidebarCollapsed()) {
            <!-- Sidebar Header -->
            <div class="h-[52px] px-4 flex items-center justify-between border-b border-[#333333]/80 shrink-0">
              <div class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[18px] text-[#BDBDBD]">language</mat-icon>
                <span class="text-[14px] font-semibold text-[#F5F5F5]">Web</span>
              </div>
              <button
                (click)="toggleLeftSidebar()"
                class="text-[#888888] hover:text-white transition-colors cursor-pointer p-1"
                title="Collapse sidebar"
              >
                <mat-icon class="!w-4 !h-4 !text-[16px]">chevron_left</mat-icon>
              </button>
            </div>

            <!-- Chat Prompt Input for Iterative Web Generation -->
            <div class="p-3 border-b border-[#333333]/60">
              <label for="web-prompt-input" class="text-[11px] font-semibold uppercase text-[#888888] block mb-1.5">Iterate with AI</label>
              <div class="relative bg-[#2B2B2B] border border-[#3D3D3D] rounded-[14px] p-2.5 shadow-sm">
                <textarea
                  #webPromptInput
                  id="web-prompt-input"
                  rows="2"
                  placeholder="e.g. Add dark luxury testimonials & pricing table..."
                  class="w-full bg-transparent text-[13px] text-[#F5F5F5] placeholder-[#757575] resize-none outline-none border-none p-0 focus:ring-0 leading-snug"
                ></textarea>
                <div class="flex justify-end pt-1">
                  <button
                    (click)="applyWebPrompt(webPromptInput)"
                    class="h-[28px] px-3 rounded-full bg-[#F5F5F5] hover:bg-white text-black font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Update</span>
                    <mat-icon class="!w-3 !h-3 !text-[12px]">send</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Version History List -->
            <div class="flex-1 p-3 overflow-y-auto space-y-2">
              <span class="text-[11px] font-semibold uppercase text-[#888888] px-1 block mb-1">Version History</span>
              
              @for (v of versions; track v.version) {
                <button
                  type="button"
                  (click)="selectVersion(v)"
                  [class.border-neutral-500]="activeVersion() === v.version"
                  [class.bg-[#2A2A2A]]="activeVersion() === v.version"
                  class="w-full text-left p-2.5 rounded-[12px] bg-[#262626] border border-[#333333] hover:border-[#444444] transition-all cursor-pointer group"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[12px] font-semibold text-[#F5F5F5] font-mono">{{ v.version }}</span>
                    <span class="text-[10px] text-[#888888]">{{ v.time }}</span>
                  </div>
                  <p class="text-[11px] text-[#BDBDBD] line-clamp-2 leading-relaxed">{{ v.desc }}</p>
                </button>
              }
            </div>

            <!-- Quick Deploy Card -->
            <div class="p-3 border-t border-[#333333] bg-[#1A1A1A]/40">
              <div class="flex items-center justify-between text-[11px] text-[#888888] mb-1">
                <span>Production URL</span>
                <span class="text-emerald-400 font-mono">● LIVE</span>
              </div>
              <div class="flex items-center justify-between px-2.5 py-1.5 rounded-[8px] bg-[#2B2B2B] text-[12px] font-mono text-[#F5F5F5] truncate">
                <span class="truncate">https://autox-store.run.app</span>
                <button (click)="copyUrl()" class="text-[#888888] hover:text-white p-0.5 ml-1 cursor-pointer">
                  <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">content_copy</mat-icon>
                </button>
              </div>
            </div>
          }
        </aside>

        <!-- Draggable Resizer Handle -->
        @if (!isLeftSidebarCollapsed()) {
          <div
            (mousedown)="startResizing($event)"
            class="w-[6px] hover:w-[8px] h-full cursor-col-resize hover:bg-neutral-600/40 active:bg-neutral-500/70 transition-colors z-20 shrink-0"
            title="Drag to resize sidebar"
          ></div>
        } @else {
          <!-- Reopen Button when collapsed -->
          <button
            (click)="toggleLeftSidebar()"
            class="absolute top-4 left-3 z-30 w-[32px] h-[32px] rounded-[8px] bg-[#2B2B2B] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center cursor-pointer shadow-md"
            title="Expand Web sidebar"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">chevron_right</mat-icon>
          </button>
        }

        <!-- ================= 3. Workspace Content Views ================= -->
        <main class="flex-1 h-full overflow-hidden bg-[#181818] relative flex flex-col">
          
          <!-- TAB 1: PREVIEW TAB -->
          @if (state.webActiveTab() === 'preview') {
            <!-- Preview Controls Bar -->
            <div class="h-[48px] px-4 flex items-center justify-between border-b border-[#333333] bg-[#212121] shrink-0 text-[#BDBDBD]">
              <!-- Device Switcher -->
              <div class="flex items-center gap-1 bg-[#1A1A1A] p-1 rounded-[8px] border border-[#333333]">
                <button
                  (click)="state.webDeviceView.set('desktop')"
                  [class.bg-[#333333]]="state.webDeviceView() === 'desktop'"
                  [class.text-white]="state.webDeviceView() === 'desktop'"
                  class="p-1 rounded-[6px] hover:text-white transition-colors cursor-pointer"
                  title="Desktop View"
                >
                  <mat-icon class="!w-4 !h-4 !text-[18px]">desktop_mac</mat-icon>
                </button>
                <button
                  (click)="state.webDeviceView.set('tablet')"
                  [class.bg-[#333333]]="state.webDeviceView() === 'tablet'"
                  [class.text-white]="state.webDeviceView() === 'tablet'"
                  class="p-1 rounded-[6px] hover:text-white transition-colors cursor-pointer"
                  title="Tablet View (768px)"
                >
                  <mat-icon class="!w-4 !h-4 !text-[18px]">tablet</mat-icon>
                </button>
                <button
                  (click)="state.webDeviceView.set('mobile')"
                  [class.bg-[#333333]]="state.webDeviceView() === 'mobile'"
                  [class.text-white]="state.webDeviceView() === 'mobile'"
                  class="p-1 rounded-[6px] hover:text-white transition-colors cursor-pointer"
                  title="Mobile View (375px)"
                >
                  <mat-icon class="!w-4 !h-4 !text-[18px]">smartphone</mat-icon>
                </button>
              </div>

              <!-- Address bar preview -->
              <div class="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] rounded-full border border-[#333333] text-[12px] font-mono text-[#888888] max-w-[340px] w-full mx-4">
                <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-emerald-400">lock</mat-icon>
                <span class="truncate">https://autox-preview.app/business-demo</span>
              </div>

              <!-- Zoom & Refresh Controls -->
              <div class="flex items-center gap-2">
                <div class="flex items-center gap-1 bg-[#1A1A1A] px-2 py-0.5 rounded-[6px] border border-[#333333] text-[12px] font-mono">
                  <button (click)="zoomOut()" class="hover:text-white cursor-pointer px-1">-</button>
                  <span>{{ state.webZoomLevel() }}%</span>
                  <button (click)="zoomIn()" class="hover:text-white cursor-pointer px-1">+</button>
                </div>
                <button
                  (click)="refreshPreview()"
                  class="p-1.5 rounded-[8px] bg-[#2B2B2B] hover:bg-[#333333] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white transition-colors cursor-pointer"
                  title="Refresh preview"
                >
                  <mat-icon class="!w-4 !h-4 !text-[16px]" [class.animate-spin]="isRefreshing()">refresh</mat-icon>
                </button>
              </div>
            </div>

            <!-- Preview Canvas Body -->
            <div class="flex-1 overflow-auto p-4 sm:p-6 flex items-start justify-center bg-[#151515]">
              <div
                [style.width]="canvasWidth()"
                [style.transform]="'scale(' + (state.webZoomLevel() / 100) + ')'"
                class="origin-top transition-all duration-200 rounded-[16px] overflow-hidden border border-[#333333] shadow-2xl bg-[#121212] min-h-[700px] flex flex-col"
              >
                <!-- Browser mockup header inside preview -->
                <div class="h-9 bg-[#1E1E1E] px-4 flex items-center gap-2 border-b border-[#2A2A2A] shrink-0">
                  <div class="flex gap-1.5">
                    <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                    <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                    <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                  </div>
                  <div class="flex-1 flex justify-center">
                    <span class="text-[11px] font-mono text-[#888888]">AutoX Generated Storefront</span>
                  </div>
                </div>

                <!-- Live Rendered Demo Business Website -->
                <div class="p-6 sm:p-10 flex-1 flex flex-col bg-[#121212] text-[#F5F5F5] select-text">
                  <!-- Navbar inside website preview -->
                  <div class="flex items-center justify-between pb-8 border-b border-[#222222]">
                    <div class="flex items-center gap-2">
                      <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-black text-[11px]">
                        AX
                      </div>
                      <span class="font-semibold text-[16px] tracking-tight">AutoX Dynamics</span>
                    </div>
                    <div class="hidden sm:flex items-center gap-6 text-[13px] text-[#A0A0A0]">
                      <span class="hover:text-white cursor-pointer">Platform</span>
                      <span class="hover:text-white cursor-pointer">Capabilities</span>
                      <span class="hover:text-white cursor-pointer">Pricing</span>
                    </div>
                    <button class="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-[12px] hover:bg-neutral-200 transition-colors">
                      Client Portal
                    </button>
                  </div>

                  <!-- Hero Section -->
                  <div class="pt-16 pb-12 text-center max-w-2xl mx-auto">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333] text-[11px] text-[#BDBDBD] mb-6">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Next-Gen Autonomous Commerce
                    </div>
                    <h1 class="text-[32px] sm:text-[44px] font-[300] tracking-tight text-white mb-4 leading-tight">
                      Intelligent Precision for High-Growth Brands
                    </h1>
                    <p class="text-[14px] sm:text-[16px] text-[#9E9E9E] font-normal mb-8 leading-relaxed">
                      Deploy instant 3D product visualizers, autonomous CRM pipeline tracking, and zero-latency voice agents in one unified system.
                    </p>
                    <div class="flex flex-wrap items-center justify-center gap-3">
                      <button class="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-[13px] hover:bg-neutral-200 transition-all shadow-md">
                        Start 14-Day Free Access
                      </button>
                      <button class="px-6 py-2.5 rounded-xl bg-[#262626] border border-[#3D3D3D] text-white font-medium text-[13px] hover:bg-[#303030] transition-all">
                        View Live Showroom
                      </button>
                    </div>
                  </div>

                  <!-- Interactive 3-Card Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 pb-10">
                    <div class="p-5 rounded-2xl bg-[#1C1C1C] border border-[#2B2B2B] hover:border-[#444444] transition-all">
                      <mat-icon class="!w-6 !h-6 !text-[24px] text-amber-400 mb-3">auto_awesome</mat-icon>
                      <h3 class="text-[15px] font-medium text-white mb-1.5">Generative Showroom</h3>
                      <p class="text-[12px] text-[#888888] leading-relaxed">Instant 3D spatial renders and dynamic lighting for high-ticket catalog products.</p>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#1C1C1C] border border-[#2B2B2B] hover:border-[#444444] transition-all">
                      <mat-icon class="!w-6 !h-6 !text-[24px] text-blue-400 mb-3">phone_in_talk</mat-icon>
                      <h3 class="text-[15px] font-medium text-white mb-1.5">Voice Inbound Agents</h3>
                      <p class="text-[12px] text-[#888888] leading-relaxed">Handle customer consultations with 180ms neural conversational models.</p>
                    </div>

                    <div class="p-5 rounded-2xl bg-[#1C1C1C] border border-[#2B2B2B] hover:border-[#444444] transition-all">
                      <mat-icon class="!w-6 !h-6 !text-[24px] text-emerald-400 mb-3">trending_up</mat-icon>
                      <h3 class="text-[15px] font-medium text-white mb-1.5">Auto-Sequenced CRM</h3>
                      <p class="text-[12px] text-[#888888] leading-relaxed">Automatic contract generation and high-value lead scoring on autopilot.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- TAB 2: BACKEND TAB -->
          @if (state.webActiveTab() === 'backend') {
            <div class="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              <!-- Endpoints list -->
              <div class="w-full md:w-[320px] bg-[#212121] border-r border-[#333333] flex flex-col shrink-0 overflow-y-auto p-3 space-y-2">
                <span class="text-[11px] font-semibold uppercase text-[#888888] px-2 block">API Endpoints</span>
                @for (ep of state.apiEndpoints; track ep.path) {
                  <button
                    (click)="selectedEndpoint.set(ep)"
                    [class.border-neutral-500]="selectedEndpoint().path === ep.path"
                    [class.bg-[#2A2A2A]]="selectedEndpoint().path === ep.path"
                    class="w-full p-2.5 rounded-[12px] bg-[#262626] border border-[#333333] hover:border-[#444444] text-left transition-all cursor-pointer"
                  >
                    <div class="flex items-center justify-between mb-1">
                      <span
                        [class.bg-emerald-950]="ep.method === 'GET'"
                        [class.text-emerald-400]="ep.method === 'GET'"
                        [class.border-emerald-800]="ep.method === 'GET'"
                        [class.bg-blue-950]="ep.method === 'POST'"
                        [class.text-blue-400]="ep.method === 'POST'"
                        [class.border-blue-800]="ep.method === 'POST'"
                        class="px-2 py-0.5 rounded-[6px] text-[10px] font-mono font-bold border"
                      >
                        {{ ep.method }}
                      </span>
                      <span class="text-[10px] font-mono text-[#888888]">{{ ep.latency }}</span>
                    </div>
                    <p class="text-[12px] font-mono text-[#F5F5F5] truncate">{{ ep.path }}</p>
                    <p class="text-[11px] text-[#888888] truncate mt-0.5">{{ ep.description }}</p>
                  </button>
                }

                <!-- Database Schemas Section -->
                <div class="pt-4">
                  <span class="text-[11px] font-semibold uppercase text-[#888888] px-2 block mb-2">Database Schema Cards</span>
                  <div class="space-y-2">
                    @for (table of state.dbTables; track table.name) {
                      <div class="p-2.5 rounded-[12px] bg-[#1E1E1E] border border-[#333333]">
                        <div class="flex items-center gap-2 mb-1">
                          <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-amber-400">table_chart</mat-icon>
                          <span class="text-[12px] font-mono font-semibold text-[#F5F5F5]">{{ table.name }}</span>
                        </div>
                        <p class="text-[10px] text-[#888888] mb-2">{{ table.description }}</p>
                        <div class="space-y-1">
                          @for (col of table.columns; track col.name) {
                            <div class="flex items-center justify-between text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#262626]">
                              <span class="text-[#E0E0E0]">{{ col.name }}</span>
                              <span class="text-[#888888]">{{ col.type }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Endpoint Inspector & Live JSON Viewer -->
              <div class="flex-1 flex flex-col h-full overflow-hidden bg-[#181818] p-4 sm:p-6">
                <div class="flex items-center justify-between pb-4 border-b border-[#333333] mb-4">
                  <div class="flex items-center gap-3">
                    <span class="px-2.5 py-1 rounded-[6px] text-[12px] font-mono font-bold bg-[#333333] text-white">
                      {{ selectedEndpoint().method }}
                    </span>
                    <span class="text-[15px] font-mono text-[#F5F5F5]">{{ selectedEndpoint().path }}</span>
                  </div>

                  <button
                    (click)="testEndpoint()"
                    class="h-[34px] px-4 rounded-full bg-[#F5F5F5] hover:bg-white text-black font-semibold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    <mat-icon class="!w-4 !h-4 !text-[16px]">play_arrow</mat-icon>
                    <span>Test Endpoint</span>
                  </button>
                </div>

                <p class="text-[13px] text-[#BDBDBD] mb-4">{{ selectedEndpoint().description }}</p>

                <!-- Response payload container -->
                <div class="flex-1 flex flex-col rounded-[16px] bg-[#121212] border border-[#2B2B2B] overflow-hidden">
                  <div class="h-9 px-4 flex items-center justify-between bg-[#1A1A1A] border-b border-[#2B2B2B] text-[11px] font-mono text-[#888888]">
                    <span>Status: <strong class="text-emerald-400">200 OK</strong></span>
                    <span>Format: application/json</span>
                  </div>
                  <pre class="flex-1 p-4 font-mono text-[12px] sm:text-[13px] text-emerald-300 overflow-auto leading-relaxed select-text">{{ selectedEndpoint().sampleResponse }}</pre>
                </div>
              </div>
            </div>
          }

          <!-- TAB 3: CODE TAB -->
          @if (state.webActiveTab() === 'code') {
            <div class="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              <!-- File Tree Explorer on Left (220px width) -->
              <div class="w-full md:w-[220px] bg-[#212121] border-r border-[#333333] flex flex-col shrink-0 overflow-y-auto p-2">
                <span class="text-[11px] font-semibold uppercase text-[#888888] px-2.5 py-2 block">Files</span>
                <div class="space-y-0.5">
                  @for (file of state.codeFiles; track file.path) {
                    <button
                      (click)="state.activeCodeFilePath.set(file.path)"
                      [class.bg-[#333333]]="state.activeCodeFilePath() === file.path"
                      [class.text-white]="state.activeCodeFilePath() === file.path"
                      [class.text-[#BDBDBD]]="state.activeCodeFilePath() !== file.path"
                      class="w-full px-2.5 py-1.5 rounded-[8px] flex items-center gap-2 text-left text-[12px] font-mono hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                    >
                      <mat-icon class="!w-4 !h-4 !text-[16px] text-[#888888]">{{ file.icon }}</mat-icon>
                      <span class="truncate">{{ file.name }}</span>
                    </button>
                  }
                </div>
              </div>

              <!-- Code Editor on Right with "Copy Code" button -->
              <div class="flex-1 flex flex-col h-full overflow-hidden bg-[#151515]">
                <div class="h-10 px-4 bg-[#1E1E1E] border-b border-[#2A2A2A] flex items-center justify-between shrink-0">
                  <div class="flex items-center gap-2">
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-neutral-400">code</mat-icon>
                    <span class="text-[12px] font-mono text-[#F5F5F5]">{{ state.activeCodeFile().path }}</span>
                  </div>

                  <button
                    (click)="copyActiveCode()"
                    class="h-[28px] px-3 rounded-[6px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[11px] font-medium text-[#F5F5F5] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">content_copy</mat-icon>
                    <span>Copy Code</span>
                  </button>
                </div>

                <div class="flex-1 overflow-auto p-4 bg-[#121212]">
                  <pre class="font-mono text-[13px] text-[#E0E0E0] leading-relaxed select-text">{{ state.activeCodeFile().content }}</pre>
                </div>
              </div>
            </div>
          }

        </main>
      </div>

    </div>
  `
})
export class WebWorkspace {
  readonly state = inject(WorkspaceState);
  readonly isLeftSidebarCollapsed = signal<boolean>(false);
  readonly isRefreshing = signal<boolean>(false);
  readonly selectedEndpoint = signal<ApiEndpoint>(this.state.apiEndpoints[0]);
  readonly activeVersion = signal<string>('v1.2');

  readonly versions = [
    { version: 'v1.2', time: '10m ago', desc: 'Added dark titanium pricing matrix and 3D showroom visualizer' },
    { version: 'v1.1', time: '1h ago', desc: 'Integrated neural voice caller and lead scoring pipeline' },
    { version: 'v1.0', time: '2h ago', desc: 'Initial autonomous scaffold with responsive navigation' }
  ];

  canvasWidth(): string {
    switch (this.state.webDeviceView()) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  }

  toggleLeftSidebar() {
    this.isLeftSidebarCollapsed.update(v => !v);
  }

  startResizing(event: MouseEvent) {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = this.state.webSidebarWidth();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.min(Math.max(startWidth + delta, 240), 500);
      this.state.webSidebarWidth.set(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  zoomIn() {
    this.state.webZoomLevel.update(z => Math.min(z + 15, 150));
  }

  zoomOut() {
    this.state.webZoomLevel.update(z => Math.max(z - 15, 50));
  }

  refreshPreview() {
    this.isRefreshing.set(true);
    setTimeout(() => {
      this.isRefreshing.set(false);
      this.state.showToast('Preview refreshed');
    }, 600);
  }

  applyWebPrompt(input: HTMLTextAreaElement) {
    const text = input.value.trim();
    if (!text) return;
    this.state.showToast('Applying AI web modifications...');
    input.value = '';
    setTimeout(() => {
      this.state.showToast('Web storefront updated with new layout!');
    }, 1000);
  }

  selectVersion(v: { version: string; desc: string }) {
    this.activeVersion.set(v.version);
    this.state.showToast(`Restored snapshot ${v.version}`);
  }

  copyUrl() {
    navigator.clipboard?.writeText('https://autox-store.run.app');
    this.state.showToast('URL copied to clipboard');
  }

  exportToGithub() {
    this.state.showToast('Repository exported to GitHub: autox-enterprise-template');
  }

  downloadZip() {
    this.state.showToast('Downloading autox-fullstack-bundle.zip...');
  }

  testEndpoint() {
    this.state.showToast(`Executed ${this.selectedEndpoint().path} (200 OK)`);
  }

  copyActiveCode() {
    navigator.clipboard?.writeText(this.state.activeCodeFile().content);
    this.state.showToast('Code copied to clipboard!');
  }
}
