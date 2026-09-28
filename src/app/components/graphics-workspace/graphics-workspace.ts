import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { BrandLogo } from '../brand-logo/brand-logo';
import { GraphicItem } from '../../models/workspace.types';

@Component({
  selector: 'app-graphics-workspace',
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
          <span class="text-[16px] font-semibold text-[#F5F5F5]">AutoX Graphics</span>
        </div>

        <div class="flex items-center gap-3">
          <button
            (click)="state.setView('web')"
            class="px-3.5 py-1.5 rounded-full bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[12px] text-[#BDBDBD] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <mat-icon class="!w-4 !h-4 !text-[16px]">language</mat-icon>
            <span>Switch to Web Studio</span>
          </button>

          <button
            (click)="state.openUpgradeModal()"
            class="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2B2B2B] to-[#383838] border border-[#444444] text-[11px] font-bold tracking-wider uppercase text-[#F5F5F5] hover:text-white transition-all cursor-pointer"
          >
            UPGRADE
          </button>
        </div>
      </header>

      <div class="flex-1 flex overflow-hidden">
        
        <!-- Left Resizable Sidebar: Width 256px to 600px -->
        <aside
          [style.width.px]="state.graphicsSidebarWidth()"
          class="h-full bg-[#212121] border-r border-[#333333] flex flex-col shrink-0 overflow-y-auto p-4 space-y-5"
        >
          <div>
            <span class="text-[11px] font-semibold uppercase text-[#888888] tracking-wider block mb-2">Prompt Input</span>
            <div class="bg-[#2B2B2B] border border-[#3D3D3D] rounded-[16px] p-3 shadow-inner">
              <textarea
                [value]="state.graphicsPrompt()"
                (input)="onPromptChange($event)"
                rows="3"
                placeholder="Describe your 3D brand asset, product render, or logo..."
                class="w-full bg-transparent text-[13px] text-[#F5F5F5] placeholder-[#757575] resize-none outline-none border-none p-0 focus:ring-0 leading-relaxed"
              ></textarea>
              <div class="flex justify-between items-center pt-2 border-t border-[#383838] mt-2">
                <span class="text-[10px] text-[#888888]">Powered by AutoX Diffusion</span>
                <button
                  (click)="state.generateNewGraphic()"
                  class="h-[32px] px-4 rounded-full bg-[#F5F5F5] hover:bg-white text-black font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">auto_awesome</mat-icon>
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Aspect Ratio Options: 1:1, 16:9, 9:16, 4:3 -->
          <div>
            <span class="text-[11px] font-semibold uppercase text-[#888888] tracking-wider block mb-2">Aspect Ratio</span>
            <div class="grid grid-cols-4 gap-2">
              @for (ratio of aspectRatios; track ratio) {
                <button
                  (click)="state.selectedAspectRatio.set(ratio)"
                  [class.bg-[#3D3D3D]]="state.selectedAspectRatio() === ratio"
                  [class.text-white]="state.selectedAspectRatio() === ratio"
                  [class.border-neutral-500]="state.selectedAspectRatio() === ratio"
                  class="py-2 rounded-[10px] bg-[#2B2B2B] border border-[#333333] text-[12px] font-mono text-[#BDBDBD] hover:text-white transition-all cursor-pointer text-center"
                >
                  {{ ratio }}
                </button>
              }
            </div>
          </div>

          <!-- Style Preset Selector -->
          <div>
            <span class="text-[11px] font-semibold uppercase text-[#888888] tracking-wider block mb-2">Aesthetic Preset</span>
            <div class="space-y-1.5">
              @for (st of styles; track st) {
                <button
                  (click)="state.selectedStyle.set(st)"
                  [class.bg-[#333333]]="state.selectedStyle() === st"
                  [class.text-white]="state.selectedStyle() === st"
                  [class.border-neutral-500]="state.selectedStyle() === st"
                  class="w-full px-3 py-2 rounded-[10px] bg-[#262626] border border-[#333333] text-left text-[12px] text-[#BDBDBD] hover:text-white transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>{{ st }}</span>
                  @if (state.selectedStyle() === st) {
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px] text-amber-400">check</mat-icon>
                  }
                </button>
              }
            </div>
          </div>

          <!-- Generation History in Sidebar -->
          <div class="flex-1 flex flex-col pt-2 border-t border-[#333333]">
            <span class="text-[11px] font-semibold uppercase text-[#888888] tracking-wider block mb-2">Recent Generations</span>
            <div class="space-y-2 overflow-y-auto">
              @for (item of state.graphicsGallery(); track item.id) {
                <button
                  type="button"
                  (click)="previewItem.set(item)"
                  class="w-full text-left p-2 rounded-[12px] bg-[#262626] border border-[#333333] hover:border-[#444444] transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <img [src]="item.imageUrl" alt="Preview" class="w-10 h-10 rounded-[8px] object-cover bg-neutral-800 shrink-0" />
                  <div class="min-w-0 flex-1">
                    <p class="text-[11px] text-[#F5F5F5] truncate">{{ item.prompt }}</p>
                    <div class="flex items-center gap-2 text-[10px] text-[#888888]">
                      <span>{{ item.aspectRatio }}</span>
                      <span>•</span>
                      <span>{{ item.timestamp }}</span>
                    </div>
                  </div>
                </button>
              }
            </div>
          </div>
        </aside>

        <!-- Drag handle to resize sidebar -->
        <div
          (mousedown)="startResizing($event)"
          class="w-[6px] hover:w-[8px] h-full cursor-col-resize hover:bg-neutral-600/40 active:bg-neutral-500/70 transition-colors z-20 shrink-0"
          title="Drag to resize sidebar"
        ></div>

        <!-- Main Canvas: border 1px dashed #333333, generation canvas & gallery grid -->
        <main class="flex-1 h-full overflow-y-auto p-6 bg-[#161616] flex flex-col gap-6">
          
          <!-- Active Hero Canvas Area -->
          <div class="relative w-full rounded-[24px] border border-dashed border-[#3D3D3D] bg-[#1C1C1C] p-6 flex flex-col items-center justify-center min-h-[380px] shadow-2xl overflow-hidden group">
            <div class="relative max-w-[640px] w-full rounded-[16px] overflow-hidden shadow-2xl border border-[#333333] bg-[#121212]">
              <img
                [src]="previewItem().imageUrl"
                alt="Active Render"
                class="w-full h-auto max-h-[460px] object-contain mx-auto"
              />
              <div class="p-4 bg-[#1E1E1E] border-t border-[#2B2B2B] flex items-center justify-between">
                <div>
                  <h4 class="text-[13px] font-medium text-white truncate max-w-[360px]">{{ previewItem().prompt }}</h4>
                  <p class="text-[11px] text-[#888888]">{{ previewItem().style }} • {{ previewItem().aspectRatio }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    (click)="downloadImage(previewItem())"
                    class="h-[32px] px-3 rounded-[8px] bg-[#2B2B2B] hover:bg-[#383838] border border-[#3D3D3D] text-[11px] text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">download</mat-icon>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Gallery Grid with Hover Actions -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[12px] font-semibold uppercase tracking-wider text-[#888888]">Brand Asset Showcase</span>
              <span class="text-[12px] text-[#888888]">{{ state.graphicsGallery().length }} Items Rendered</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              @for (item of state.graphicsGallery(); track item.id) {
                <div
                  class="group relative rounded-[16px] overflow-hidden bg-[#242424] border border-[#333333] hover:border-[#555555] transition-all cursor-pointer shadow-lg"
                >
                  <img [src]="item.imageUrl" alt="Gallery" class="w-full aspect-video object-cover bg-neutral-900 group-hover:scale-105 transition-transform duration-300" />
                  
                  <div class="p-3 bg-[#1F1F1F]">
                    <p class="text-[12px] font-medium text-[#F5F5F5] truncate">{{ item.prompt }}</p>
                    <p class="text-[10px] text-[#888888] mt-0.5">{{ item.style }}</p>
                  </div>

                  <!-- Hover overlay action -->
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      (click)="downloadImage(item)"
                      class="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform active:scale-95"
                      title="Download image"
                    >
                      <mat-icon class="!w-4 !h-4 !text-[18px]">download</mat-icon>
                    </button>
                    <button
                      type="button"
                      (click)="previewItem.set(item)"
                      class="w-9 h-9 rounded-full bg-[#2B2B2B] hover:bg-[#383838] text-white border border-[#444] flex items-center justify-center shadow-lg transition-transform active:scale-95"
                      title="Inspect full-size"
                    >
                      <mat-icon class="!w-4 !h-4 !text-[18px]">zoom_in</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

        </main>
      </div>

    </div>
  `
})
export class GraphicsWorkspace {
  readonly state = inject(WorkspaceState);
  readonly previewItem = signal<GraphicItem>(this.state.graphicsGallery()[0]);

  readonly aspectRatios: ('1:1' | '16:9' | '9:16' | '4:3')[] = ['1:1', '16:9', '9:16', '4:3'];
  readonly styles = [
    'Minimalist Dark 3D',
    'Photorealistic Studio',
    'Cyber Geometric',
    'Vector Editorial'
  ];

  onPromptChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.state.graphicsPrompt.set(target.value);
  }

  startResizing(event: MouseEvent) {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = this.state.graphicsSidebarWidth();

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = Math.min(Math.max(startWidth + delta, 256), 600);
      this.state.graphicsSidebarWidth.set(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  downloadImage(item: GraphicItem) {
    this.state.showToast(`Downloaded asset: ${item.id}.png`);
  }
}
