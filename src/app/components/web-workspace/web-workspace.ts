import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
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

        <!-- Right: GitHub icon button and Download icon button -->
        <div class="flex items-center gap-2.5">
          <button
            (click)="exportToGithub()"
            class="w-[36px] h-[36px] rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Export repository to GitHub"
            aria-label="GitHub export"
          >
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
                  placeholder="Describe your web app or feature..."
                  class="w-full bg-transparent text-[13px] text-[#F5F5F5] placeholder-[#757575] resize-none outline-none border-none p-0 focus:ring-0 leading-snug"
                ></textarea>
                <div class="flex justify-end pt-1">
                  <button
                    (click)="applyWebPrompt(webPromptInput)"
                    class="h-[28px] px-3 rounded-full bg-[#F5F5F5] hover:bg-white text-black font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    <span>Generate</span>
                    <mat-icon class="!w-3 !h-3 !text-[12px]">send</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Version History List -->
            <div class="flex-1 p-3 overflow-y-auto space-y-2">
              <span class="text-[11px] font-semibold uppercase text-[#888888] px-1 block mb-1">Version History</span>
              
              @if (versions().length > 0) {
                @for (v of versions(); track v.version) {
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
              } @else {
                <div class="p-4 rounded-[12px] bg-[#262626]/40 border border-[#333333] text-center text-[11px] text-[#777777]">
                  No version snapshots yet
                </div>
              }
            </div>

            <!-- Quick Deploy Card -->
            <div class="p-3 border-t border-[#333333] bg-[#1A1A1A]/40">
              <div class="flex items-center justify-between text-[11px] text-[#888888] mb-1">
                <span>Production URL</span>
                <span class="inline-flex items-center gap-1 text-emerald-400 font-mono">
                  <mat-icon class="!w-2.5 !h-2.5 !text-[10px]">fiber_manual_record</mat-icon>
                  <span>{{ state.hasActiveProject() ? 'READY' : 'STANDBY' }}</span>
                </span>
              </div>
              <div class="flex items-center justify-between px-2.5 py-1.5 rounded-[8px] bg-[#2B2B2B] text-[12px] font-mono text-[#F5F5F5] truncate">
                <span class="truncate">{{ state.hasActiveProject() ? 'https://autox-workspace.run.app' : 'Not deployed yet' }}</span>
                @if (state.hasActiveProject()) {
                  <button (click)="copyUrl()" class="text-[#888888] hover:text-white p-0.5 ml-1 cursor-pointer">
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">content_copy</mat-icon>
                  </button>
                }
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
                <span class="truncate">{{ state.hasActiveProject() ? 'https://autox-preview.app/' + (state.projectTitle() || 'app') : 'https://autox-preview.app/empty' }}</span>
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
              @if (state.hasActiveProject()) {
                <div
                  [style.width]="canvasWidth()"
                  [style.transform]="'scale(' + (state.webZoomLevel() / 100) + ')'"
                  class="origin-top transition-all duration-200 rounded-[16px] overflow-hidden border border-[#333333] shadow-2xl bg-[#121212] min-h-[640px] flex flex-col"
                >
                  <!-- Browser mockup header inside preview -->
                  <div class="h-9 bg-[#1E1E1E] px-4 flex items-center gap-2 border-b border-[#2A2A2A] shrink-0">
                    <div class="flex gap-1.5">
                      <span class="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                      <span class="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                      <span class="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                    </div>
                    <div class="flex-1 flex justify-center">
                      <span class="text-[11px] font-mono text-[#888888]">{{ state.projectTitle() || 'AutoX Application' }}</span>
                    </div>
                  </div>

                  <!-- Live Rendered App -->
                  <div class="p-8 sm:p-12 flex-1 flex flex-col bg-[#121212] text-[#F5F5F5] select-text">
                    <div class="flex items-center justify-between pb-6 border-b border-[#222222]">
                      <div class="flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-full bg-[#2A2A2A] border border-[#444] flex items-center justify-center font-bold text-white text-xs">
                          AX
                        </div>
                        <span class="font-semibold text-[16px] tracking-tight text-white">{{ state.projectTitle() || 'Project' }}</span>
                      </div>
                      <button class="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-[12px] hover:bg-neutral-200 transition-colors">
                        Launch
                      </button>
                    </div>

                    <div class="pt-16 pb-12 text-center max-w-xl mx-auto">
                      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333333] text-[11px] text-[#BDBDBD] mb-6">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Project Online
                      </div>
                      <h1 class="text-[32px] sm:text-[40px] font-light tracking-tight text-white mb-4">
                        {{ state.projectTitle() || 'Your Autonomous Workspace' }}
                      </h1>
                      <p class="text-[14px] text-[#9E9E9E] font-normal mb-8 leading-relaxed">
                        Workspace initialized and ready for component building, styling, and database schema creation.
                      </p>
                    </div>
                  </div>
                </div>
              } @else {
                <!-- Empty State When No Project Created Yet -->
                <div class="flex flex-col items-center justify-center text-center p-8 max-w-md my-auto">
                  <div class="w-16 h-16 rounded-2xl bg-[#212121] border border-[#333333] flex items-center justify-center text-[#888888] mb-4">
                    <mat-icon class="!w-8 !h-8 !text-[32px]">web</mat-icon>
                  </div>
                  <h3 class="text-lg font-light text-white mb-2">No Web Project Active</h3>
                  <p class="text-xs text-[#888888] leading-relaxed mb-6">
                    Enter a prompt in the left sidebar or in the main prompt box to generate your custom storefront or web app.
                  </p>
                  <button
                    (click)="initStarterProject()"
                    class="h-10 px-5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <mat-icon class="!w-4 !h-4 !text-[16px]">add</mat-icon>
                    <span>Initialize Workspace Project</span>
                  </button>
                </div>
              }
            </div>
          }

          <!-- TAB 2: BACKEND TAB -->
          @if (state.webActiveTab() === 'backend') {
            <div class="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
              <!-- Endpoints list -->
              <div class="w-full md:w-[320px] bg-[#212121] border-r border-[#333333] flex flex-col shrink-0 overflow-y-auto p-3 space-y-2">
                <div class="flex items-center justify-between px-2 pt-1">
                  <span class="text-[11px] font-semibold uppercase text-[#888888] block">API Endpoints</span>
                  <button
                    (click)="addNewEndpoint()"
                    class="text-[11px] text-[#BDBDBD] hover:text-white flex items-center gap-0.5 cursor-pointer"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">add</mat-icon>
                    <span>New Route</span>
                  </button>
                </div>

                @if (state.apiEndpoints().length > 0) {
                  @for (ep of state.apiEndpoints(); track ep.path) {
                    <button
                      (click)="selectedEndpoint.set(ep)"
                      [class.border-neutral-500]="activeEndpoint()?.path === ep.path"
                      [class.bg-[#2A2A2A]]="activeEndpoint()?.path === ep.path"
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
                } @else {
                  <div class="p-4 rounded-[12px] bg-[#262626]/40 border border-[#333333] text-center text-[11px] text-[#777777]">
                    No endpoints configured
                  </div>
                }

                <!-- Database Schemas Section -->
                <div class="pt-4">
                  <span class="text-[11px] font-semibold uppercase text-[#888888] px-2 block mb-2">Database Schema Cards</span>
                  <div class="space-y-2">
                    @if (state.dbTables().length > 0) {
                      @for (table of state.dbTables(); track table.name) {
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
                    } @else {
                      <div class="p-4 rounded-[12px] bg-[#262626]/40 border border-[#333333] text-center text-[11px] text-[#777777]">
                        No database schemas defined
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Endpoint Inspector & Live JSON Viewer -->
              <div class="flex-1 flex flex-col h-full overflow-hidden bg-[#181818] p-4 sm:p-6">
                @if (activeEndpoint(); as ep) {
                  <div class="flex items-center justify-between pb-4 border-b border-[#333333] mb-4">
                    <div class="flex items-center gap-3">
                      <span class="px-2.5 py-1 rounded-[6px] text-[12px] font-mono font-bold bg-[#333333] text-white">
                        {{ ep.method }}
                      </span>
                      <span class="text-[15px] font-mono text-[#F5F5F5]">{{ ep.path }}</span>
                    </div>

                    <button
                      (click)="testEndpoint(ep)"
                      class="h-[34px] px-4 rounded-full bg-[#F5F5F5] hover:bg-white text-black font-semibold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      <mat-icon class="!w-4 !h-4 !text-[16px]">play_arrow</mat-icon>
                      <span>Test Endpoint</span>
                    </button>
                  </div>

                  <p class="text-[13px] text-[#BDBDBD] mb-4">{{ ep.description }}</p>

                  <div class="flex-1 flex flex-col rounded-[16px] bg-[#121212] border border-[#2B2B2B] overflow-hidden">
                    <div class="h-9 px-4 flex items-center justify-between bg-[#1A1A1A] border-b border-[#2B2B2B] text-[11px] font-mono text-[#888888]">
                      <span>Status: <strong class="text-emerald-400">200 OK</strong></span>
                      <span>Format: application/json</span>
                    </div>
                    <pre class="flex-1 p-4 font-mono text-[12px] sm:text-[13px] text-emerald-300 overflow-auto leading-relaxed select-text">{{ ep.sampleResponse }}</pre>
                  </div>
                } @else {
                  <div class="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <mat-icon class="!w-8 !h-8 !text-[32px] text-[#555] mb-2">dns</mat-icon>
                    <p class="text-sm text-[#888]">No API endpoint selected</p>
                  </div>
                }
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
                  @if (state.codeFiles().length > 0) {
                    @for (file of state.codeFiles(); track file.path) {
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
                  } @else {
                    <div class="p-3 text-center text-[11px] text-[#777]">
                      No files generated
                    </div>
                  }
                </div>
              </div>

              <!-- Code Editor on Right -->
              <div class="flex-1 flex flex-col h-full overflow-hidden bg-[#151515]">
                @if (state.activeCodeFile(); as currentFile) {
                  <div class="h-10 px-4 bg-[#1E1E1E] border-b border-[#2A2A2A] flex items-center justify-between shrink-0">
                    <div class="flex items-center gap-2">
                      <mat-icon class="!w-4 !h-4 !text-[16px] text-neutral-400">code</mat-icon>
                      <span class="text-[12px] font-mono text-[#F5F5F5]">{{ currentFile.path }}</span>
                    </div>

                    <button
                      (click)="copyActiveCode(currentFile.content)"
                      class="h-[28px] px-3 rounded-[6px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[11px] font-medium text-[#F5F5F5] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">content_copy</mat-icon>
                      <span>Copy Code</span>
                    </button>
                  </div>

                  <div class="flex-1 overflow-auto p-4 bg-[#121212]">
                    <pre class="font-mono text-[13px] text-[#E0E0E0] leading-relaxed select-text">{{ currentFile.content }}</pre>
                  </div>
                } @else {
                  <div class="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <mat-icon class="!w-8 !h-8 !text-[32px] text-[#555] mb-2">code</mat-icon>
                    <p class="text-sm text-[#888]">No source file open</p>
                  </div>
                }
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
  readonly selectedEndpoint = signal<ApiEndpoint | null>(null);
  readonly activeVersion = signal<string>('v1.0');
  readonly versions = signal<{ version: string; time: string; desc: string }[]>([]);

  readonly activeEndpoint = computed(() => {
    return this.selectedEndpoint() || this.state.apiEndpoints()[0] || null;
  });

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
    }, 500);
  }

  initStarterProject() {
    this.state.generateWebProject('Starter Project');
    this.versions.set([
      { version: 'v1.0', time: 'Just now', desc: 'Initial workspace scaffold' }
    ]);
    this.state.showToast('Project initialized');
  }

  applyWebPrompt(input: HTMLTextAreaElement) {
    const text = input.value.trim();
    if (!text) return;
    this.state.generateWebProject(text);
    const nextVer = `v1.${this.versions().length + 1}`;
    this.versions.update(list => [
      { version: nextVer, time: 'Just now', desc: text },
      ...list
    ]);
    this.activeVersion.set(nextVer);
    input.value = '';
    this.state.showToast('Web workspace updated!');
  }

  addNewEndpoint() {
    const newEp: ApiEndpoint = {
      method: 'GET',
      path: `/api/v1/resource-${Date.now().toString().slice(-4)}`,
      description: 'Dynamic resource endpoint',
      latency: '16ms',
      status: 200,
      sampleResponse: JSON.stringify({ success: true, timestamp: new Date().toISOString() }, null, 2)
    };
    this.state.apiEndpoints.update(list => [...list, newEp]);
    this.selectedEndpoint.set(newEp);
    this.state.showToast('Added new endpoint route');
  }

  selectVersion(v: { version: string; desc: string }) {
    this.activeVersion.set(v.version);
    this.state.showToast(`Restored snapshot ${v.version}`);
  }

  copyUrl() {
    navigator.clipboard?.writeText('https://autox-workspace.run.app');
    this.state.showToast('URL copied to clipboard');
  }

  exportToGithub() {
    this.state.showToast('Repository exported to GitHub');
  }

  downloadZip() {
    this.state.showToast('Downloading project ZIP bundle...');
  }

  testEndpoint(ep: ApiEndpoint) {
    this.state.showToast(`Executed ${ep.path} (200 OK)`);
  }

  copyActiveCode(content: string) {
    navigator.clipboard?.writeText(content);
    this.state.showToast('Code copied to clipboard!');
  }
}
