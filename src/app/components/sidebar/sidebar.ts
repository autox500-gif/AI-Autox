import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';
import { ToolItem } from '../../models/workspace.types';

@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, BrandLogo],
  template: `
    <!-- ================= Desktop Right Sidebar (Collapsed: 76px / Expanded: 280px) ================= -->
    <aside
      [class.w-[76px]]="state.isSidebarCollapsed()"
      [class.w-[280px]]="!state.isSidebarCollapsed()"
      class="hidden md:flex flex-col fixed top-0 right-0 h-screen bg-[#1F1F1F] border-l border-[#333333] z-30 transition-all duration-300 ease-in-out select-none shadow-xl"
    >
      <!-- ================= Header Zone ================= -->
      <div class="h-[76px] px-3.5 flex items-center shrink-0 border-b border-[#333333]/60"
           [class.justify-center]="state.isSidebarCollapsed()"
           [class.justify-between]="!state.isSidebarCollapsed()"
      >
        @if (!state.isSidebarCollapsed()) {
          <div class="flex items-center gap-3">
            <app-brand-logo [size]="'32'" />
            <span class="text-[16px] font-semibold text-[#F5F5F5] tracking-tight">AutoX</span>
          </div>
        }

        <!-- Staggered hamburger toggle icon (20px) -->
        <button
          (click)="state.toggleSidebar()"
          class="w-[42px] h-[42px] rounded-[12px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#F5F5F5] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          [title]="state.isSidebarCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
          aria-label="Toggle sidebar expansion"
        >
          <div class="flex flex-col gap-1 w-4 items-end">
            <span class="h-[2px] w-4 bg-[#F5F5F5] rounded-full"></span>
            <span class="h-[2px] w-2.5 bg-[#F5F5F5] rounded-full"></span>
            <span class="h-[2px] w-3.5 bg-[#F5F5F5] rounded-full"></span>
          </div>
        </button>
      </div>

      <!-- ================= Content Zone: Collapsed Rail ================= -->
      @if (state.isSidebarCollapsed()) {
        <div class="flex-1 flex flex-col items-center py-4 gap-3 overflow-y-auto">
          <!-- Graphics Button -->
          <button
            (click)="state.setView('graphics')"
            [class.bg-[#383838]]="state.currentView() === 'graphics'"
            class="w-[44px] h-[44px] rounded-[14px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Graphics Workspace"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">image</mat-icon>
          </button>

          <!-- Web Button -->
          <button
            (click)="state.setView('web')"
            [class.bg-[#383838]]="state.currentView() === 'web'"
            class="w-[44px] h-[44px] rounded-[14px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Web Workspace"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">language</mat-icon>
          </button>

          <!-- Posts Button -->
          <button
            (click)="state.setView('posts')"
            [class.bg-[#383838]]="state.currentView() === 'posts'"
            class="w-[44px] h-[44px] rounded-[14px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="Posts & Copy"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">description</mat-icon>
          </button>

          <!-- More Dropdown Trigger (...) -->
          <div class="relative">
            <button
              (click)="state.toggleMoreMenu()"
              [class.bg-[#383838]]="state.isMoreMenuOpen()"
              class="w-[44px] h-[44px] rounded-[14px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
              title="More Tools"
            >
              <mat-icon class="!w-5 !h-5 !text-[20px]">more_horiz</mat-icon>
            </button>

            <!-- Floating More Menu from Collapsed Rail -->
            @if (state.isMoreMenuOpen()) {
              <div class="absolute right-full mr-3 top-0 w-[220px] p-2 rounded-[16px] bg-[#2B2B2B] border border-[#3D3D3D] shadow-2xl z-50 flex flex-col gap-1 backdrop-blur-lg">
                <div class="px-2.5 py-1 text-[11px] font-semibold uppercase text-[#888888]">Automations</div>
                @for (tool of moreTools; track tool.id) {
                  <button
                    (click)="selectTool(tool)"
                    class="w-full h-[38px] px-3 rounded-[10px] flex items-center gap-2.5 text-left text-[13px] text-[#F5F5F5] hover:bg-[#383838] transition-colors cursor-pointer"
                  >
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-[#BDBDBD]">{{ tool.icon }}</mat-icon>
                    <span class="truncate">{{ tool.name }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Divider -->
          <div class="w-8 h-[1px] bg-[#333333] my-1"></div>

          <!-- New Chat Button -->
          <button
            (click)="state.createNewChat()"
            class="w-[44px] h-[44px] rounded-[14px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#F5F5F5] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
            title="New Chat"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">add</mat-icon>
          </button>
        </div>
      }

      <!-- ================= Content Zone: Expanded Sidebar (280px) ================= -->
      @if (!state.isSidebarCollapsed()) {
        <div class="flex-1 flex flex-col px-3 py-4 overflow-y-auto space-y-4">
          <!-- "New Chat" Button: Height 44px, rounded 16px, bg #2B2B2B, border 1px solid #3D3D3D -->
          <button
            (click)="state.createNewChat()"
            class="w-full h-[44px] rounded-[16px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[#F5F5F5] px-4 flex items-center gap-2.5 transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px] text-white">add</mat-icon>
            <span class="text-[14px] font-medium">New Chat</span>
          </button>

          <!-- Primary Navigation Items: Graphics, Web, Posts -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-[#888888] px-2">Workspaces</span>
            
            <button
              (click)="state.setView('graphics')"
              [class.bg-[#383838]]="state.currentView() === 'graphics'"
              class="w-full h-[44px] px-3.5 rounded-[16px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#333333] text-[#F5F5F5] flex items-center gap-3 transition-colors cursor-pointer"
            >
              <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">image</mat-icon>
              <span class="text-[13px] font-medium">Graphics</span>
            </button>

            <button
              (click)="state.setView('web')"
              [class.bg-[#383838]]="state.currentView() === 'web'"
              class="w-full h-[44px] px-3.5 rounded-[16px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#333333] text-[#F5F5F5] flex items-center gap-3 transition-colors cursor-pointer"
            >
              <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">language</mat-icon>
              <span class="text-[13px] font-medium">Web</span>
            </button>

            <button
              (click)="state.setView('posts')"
              [class.bg-[#383838]]="state.currentView() === 'posts'"
              class="w-full h-[44px] px-3.5 rounded-[16px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#333333] text-[#F5F5F5] flex items-center gap-3 transition-colors cursor-pointer"
            >
              <mat-icon class="!w-5 !h-5 !text-[20px] text-[#BDBDBD]">description</mat-icon>
              <span class="text-[13px] font-medium">Posts</span>
            </button>
          </div>

          <!-- "More" Collapsible Dropdown -->
          <div class="flex flex-col">
            <button
              (click)="state.toggleMoreMenu()"
              class="w-full h-[38px] px-3 rounded-[12px] flex items-center justify-between text-[12px] font-medium text-[#BDBDBD] hover:text-white hover:bg-[#2B2B2B] transition-colors cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <mat-icon class="!w-4 !h-4 !text-[16px]">apps</mat-icon>
                <span>Automations & Agents</span>
              </div>
              <mat-icon class="!w-4 !h-4 !text-[16px] transition-transform duration-200" [class.rotate-180]="state.isMoreMenuOpen()">
                expand_more
              </mat-icon>
            </button>

            @if (state.isMoreMenuOpen()) {
              <div class="mt-1 flex flex-col gap-1 pl-2 border-l border-[#333333] ml-2">
                @for (tool of moreTools; track tool.id) {
                  <button
                    (click)="selectTool(tool)"
                    class="w-full h-[36px] px-2.5 rounded-[10px] flex items-center gap-2.5 text-left text-[12px] text-[#BDBDBD] hover:text-white hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">{{ tool.icon }}</mat-icon>
                    <span class="truncate">{{ tool.name }}</span>
                  </button>
                }
              </div>
            }
          </div>

          <!-- Recent Chat History List -->
          <div class="flex-1 flex flex-col min-h-[140px] overflow-hidden">
            <div class="flex items-center justify-between px-2 mb-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-[#888888]">Recent History</span>
            </div>
            
            <div class="flex-1 overflow-y-auto space-y-1 pr-1">
              @for (chat of state.chatHistory(); track chat.id) {
                <div
                  class="group w-full px-2.5 py-2 rounded-[12px] hover:bg-[#2B2B2B] flex items-center justify-between transition-colors text-left"
                >
                  <button
                    type="button"
                    (click)="state.loadChatSession(chat)"
                    class="flex items-center gap-2 min-w-0 flex-1 text-left cursor-pointer focus:outline-none"
                  >
                    <mat-icon class="!w-4 !h-4 !text-[16px] text-[#888888] group-hover:text-[#BDBDBD] shrink-0">
                      chat_bubble_outline
                    </mat-icon>
                    <div class="min-w-0">
                      <p class="text-[12px] font-medium text-[#E5E5E5] truncate">{{ chat.title }}</p>
                      <p class="text-[10px] text-[#888888]">{{ chat.timestamp }}</p>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    (click)="state.deleteChatSession(chat.id, $event)"
                    class="opacity-0 group-hover:opacity-100 p-1 text-[#888888] hover:text-rose-400 transition-opacity cursor-pointer"
                    title="Delete session"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">delete</mat-icon>
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- ================= Bottom Profile Zone ================= -->
      <!-- Avatar circle 36px, username "Prathamesh", settings gear 18px -->
      <div class="h-[68px] px-3.5 flex items-center shrink-0 border-t border-[#333333]/80 bg-[#1A1A1A]/60"
           [class.justify-center]="state.isSidebarCollapsed()"
           [class.justify-between]="!state.isSidebarCollapsed()"
      >
        <button
          (click)="state.openOnboardingModal(1)"
          class="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
          title="Account Profile"
        >
          <!-- 36px avatar circle with initials or photo -->
          <div class="w-[36px] h-[36px] rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 border border-[#444444] flex items-center justify-center font-semibold text-white text-[13px] shadow-sm">
            P
          </div>

          @if (!state.isSidebarCollapsed()) {
            <div class="flex flex-col text-left">
              <span class="text-[13px] font-medium text-[#F5F5F5] group-hover:text-white transition-colors">Prathamesh</span>
              <span class="text-[11px] text-[#888888]">Pro Account</span>
            </div>
          }
        </button>

        @if (!state.isSidebarCollapsed()) {
          <button
            (click)="state.openOnboardingModal(2)"
            class="w-[32px] h-[32px] rounded-[10px] hover:bg-[#2B2B2B] text-[#BDBDBD] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Settings & Preferences"
          >
            <mat-icon class="!w-[18px] !h-[18px] !text-[18px]">settings</mat-icon>
          </button>
        }
      </div>
    </aside>

    <!-- ================= Mobile Drawer (Width: 300px, Right Slide-over) ================= -->
    @if (state.isMobileDrawerOpen()) {
      <!-- Backdrop Blur Overlay -->
      <button
        type="button"
        (click)="state.toggleMobileDrawer()"
        class="fixed inset-0 w-full h-full bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200 cursor-default border-none p-0 text-transparent"
        aria-label="Close drawer overlay"
      ></button>

      <!-- Slide-over Drawer Container -->
      <aside
        class="fixed top-0 right-0 h-screen w-[300px] bg-[#252525] border-l border-[#3D3D3D] z-50 flex flex-col shadow-2xl md:hidden animate-in slide-in-from-right duration-300"
      >
        <!-- Header -->
        <div class="h-[70px] px-5 flex items-center justify-between border-b border-[#333333]">
          <div class="flex items-center gap-3">
            <app-brand-logo [size]="'32'" />
            <span class="text-[16px] font-semibold text-[#F5F5F5]">AutoX</span>
          </div>
          <button
            (click)="state.toggleMobileDrawer()"
            class="w-[36px] h-[36px] rounded-[10px] bg-[#2B2B2B] text-[#BDBDBD] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">close</mat-icon>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 p-4 overflow-y-auto space-y-4">
          <!-- New Chat button -->
          <button
            (click)="state.createNewChat()"
            class="w-full h-[44px] rounded-[16px] bg-[#2B2B2B] border border-[#3D3D3D] text-[#F5F5F5] px-4 flex items-center gap-2.5 font-medium text-[14px]"
          >
            <mat-icon class="!w-5 !h-5 !text-[20px]">add</mat-icon>
            <span>New Chat</span>
          </button>

          <!-- Navigation Workspaces -->
          <div class="space-y-1.5">
            <span class="text-[11px] font-semibold uppercase tracking-wider text-[#888888] px-1">Workspaces</span>
            @for (tool of state.tools; track tool.id) {
              <button
                (click)="selectTool(tool)"
                class="w-full h-[42px] px-3 rounded-[12px] bg-[#2B2B2B]/60 hover:bg-[#2B2B2B] border border-[#333333] flex items-center gap-3 text-left text-[13px] text-[#F5F5F5]"
              >
                <mat-icon class="!w-4 !h-4 !text-[18px] text-[#BDBDBD]">{{ tool.icon }}</mat-icon>
                <span class="font-normal">{{ tool.name }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Bottom Profile on Mobile -->
        <div class="h-[64px] px-5 flex items-center justify-between border-t border-[#333333] bg-[#1F1F1F]">
          <div class="flex items-center gap-3">
            <div class="w-[34px] h-[34px] rounded-full bg-neutral-700 flex items-center justify-center font-bold text-white text-xs">
              P
            </div>
            <span class="text-[13px] font-medium text-[#F5F5F5]">Prathamesh</span>
          </div>
          <button
            (click)="state.openUpgradeModal()"
            class="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-black text-[10px] font-bold uppercase tracking-wider"
          >
            Upgrade
          </button>
        </div>
      </aside>
    }
  `
})
export class AppSidebar {
  readonly state = inject(WorkspaceState);

  // Tools in "More" menu
  readonly moreTools: ToolItem[] = [
    { id: 'crm', name: 'Auto CRM', icon: 'business_center', description: '', routeView: 'crm' },
    { id: 'leads', name: 'Auto Leads', icon: 'track_changes', description: '', routeView: 'leads' },
    { id: 'reply', name: 'Auto Reply', icon: 'reply', description: '', routeView: 'reply' },
    { id: 'caller', name: 'Auto Caller', icon: 'phone_in_talk', description: '', routeView: 'caller' },
    { id: 'email', name: 'Auto Email', icon: 'mail', description: '', routeView: 'email' },
    { id: 'network', name: 'Auto Network', icon: 'share', description: '', routeView: 'network' },
    { id: 'connect', name: 'Auto Connect', icon: 'link', description: '', routeView: 'connect' }
  ];

  selectTool(tool: ToolItem) {
    if (tool.routeView) {
      this.state.setView(tool.routeView);
    }
    this.state.isMoreMenuOpen.set(false);
  }
}
