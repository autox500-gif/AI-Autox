import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from '../../services/workspace.state';
import { ToolItem } from '../../models/workspace.types';

@Component({
  selector: 'app-prompt-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="relative w-full max-w-[900px] mx-auto px-4 sm:px-8 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] select-none">
      
      <!-- Main Heading: 40px mobile, 48px desktop, 300 light, tight tracking, bottom margin 48px, #F5F5F5 -->
      <h1 class="text-[38px] sm:text-[48px] font-[300] tracking-tight text-[#F5F5F5] mb-10 sm:mb-12 text-center text-balance select-text">
        Start Business Online
      </h1>

      <!-- Prompt Composer Area with Organic Ambient Glow Container -->
      <div class="relative w-full max-w-[720px] flex items-center justify-center">

        <!-- ================= Organic Ambient Glow (Behind the Prompt Box) ================= -->
        <!-- Center Light Pool: 600px x 320px, 50% radius, blur 90px, slow 360deg rotation 22s -->
        <div
          class="absolute pointer-events-none w-[600px] h-[320px] rounded-full blur-[90px] animate-pool-spin -z-10 opacity-75 sm:opacity-85"
          style="background: radial-gradient(ellipse at center, #FF7800 0%, #FFC300 45%, #2563EB 85%, transparent 100%); top: 50%; left: 50%;"
        ></div>

        <!-- Orb 1 (Orange): 320x320, blur 80px, top-left quadrant (14s organic translate cycle) -->
        <div
          class="absolute pointer-events-none w-[320px] h-[320px] rounded-full blur-[80px] animate-orb-1 -z-10 -top-16 -left-12 opacity-80"
          style="background: radial-gradient(circle, rgba(255, 107, 0, 0.46) 0%, transparent 75%);"
        ></div>

        <!-- Orb 2 (Yellow): 280x280, blur 75px, bottom-center quadrant (18s organic translate cycle) -->
        <div
          class="absolute pointer-events-none w-[280px] h-[280px] rounded-full blur-[75px] animate-orb-2 -z-10 -bottom-14 left-1/4 opacity-75"
          style="background: radial-gradient(circle, rgba(255, 204, 0, 0.44) 0%, transparent 75%);"
        ></div>

        <!-- Orb 3 (Blue): 320x320, blur 80px, top-right quadrant (16s organic translate cycle) -->
        <div
          class="absolute pointer-events-none w-[320px] h-[320px] rounded-full blur-[80px] animate-orb-3 -z-10 -top-12 -right-8 opacity-80"
          style="background: radial-gradient(circle, rgba(37, 99, 235, 0.46) 0%, transparent 75%);"
        ></div>
        <!-- ================= End Organic Ambient Glow ================= -->

        <!-- Prompt Box Card: 720px max, rounded-capsule (border-radius: 40px), solid #303030, border 1px solid #3D3D3D, shadow -->
        <div class="relative w-full rounded-[36px] sm:rounded-[40px] bg-[#303030] border border-[#3D3D3D] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] p-5 sm:p-6 transition-all duration-300">
          
          <!-- File Attachment Badges (if any) -->
          @if (state.attachedFiles().length > 0) {
            <div class="flex flex-wrap items-center gap-2 mb-3">
              @for (file of state.attachedFiles(); track file.id) {
                <div class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-[12px] bg-[#252525] border border-[#444444] max-w-[200px] shadow-sm animate-in fade-in duration-200">
                  <mat-icon class="!w-4 !h-4 !text-[16px] text-[#BDBDBD]">description</mat-icon>
                  <span class="text-[12px] text-[#F5F5F5] truncate select-none">{{ file.name }}</span>
                  <button
                    (click)="state.removeAttachedFile(file.id)"
                    class="text-[#888888] hover:text-white transition-colors cursor-pointer ml-1 p-0.5"
                    title="Remove file"
                  >
                    <mat-icon class="!w-3.5 !h-3.5 !text-[14px]">close</mat-icon>
                  </button>
                </div>
              }
            </div>
          }

          <!-- Textarea Input: Auto-expanding, placeholder "Message...", transparent, #F5F5F5, 20px, light 300, min-height 60px -->
          <div class="w-full">
            <textarea
              #textareaRef
              [value]="state.promptMessage()"
              (input)="onInput($event)"
              (keydown)="onKeyDown($event)"
              placeholder="Message..."
              rows="1"
              class="w-full bg-transparent text-[#F5F5F5] placeholder-[#757575] text-[18px] sm:text-[20px] font-[300] min-h-[58px] sm:min-h-[64px] max-h-[180px] resize-none outline-none border-none p-0 focus:ring-0 leading-relaxed overflow-y-auto"
            ></textarea>
          </div>

          <!-- Bottom Controls Bar (height 48px, flex row, aligned items) -->
          <div class="flex items-center justify-between pt-2">
            <!-- Left Side Controls -->
            <div class="relative flex items-center gap-2.5 sm:gap-3">
              <!-- Hidden File Input for Real File Attachment -->
              <input
                #fileInput
                type="file"
                multiple
                class="hidden"
                (change)="onFileSelected($event)"
              />

              <!-- Plus Attachment Button: 44px (desktop: 48px) circle, #2B2B2B, border #444444, #F5F5F5, icon 22px -->
              <button
                (click)="fileInput.click()"
                class="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] rounded-full bg-[#2B2B2B] border border-[#444444] text-[#F5F5F5] flex items-center justify-center hover:bg-[#383838] hover:border-[#555555] active:scale-95 transition-all cursor-pointer shadow-sm"
                title="Attach documents or images"
                aria-label="Attach file"
              >
                <mat-icon class="!w-[22px] !h-[22px] !text-[22px]">add</mat-icon>
              </button>

              <!-- "Tools" Pill Button: height 44px/48px, padding 0 20px, capsule (rounded-full), #2B2B2B, border #444444, text #BDBDBD, sliders icon 18px -->
              <button
                (click)="state.toggleToolsMenu()"
                [class.border-neutral-400]="state.isToolsMenuOpen()"
                [class.text-white]="state.isToolsMenuOpen()"
                class="h-[44px] sm:h-[48px] px-4 sm:px-5 rounded-full bg-[#2B2B2B] border border-[#444444] text-[#BDBDBD] hover:text-[#F5F5F5] hover:bg-[#383838] hover:border-[#555555] active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                title="Browse AutoX Tools"
                aria-label="Toggle tools menu"
              >
                <mat-icon class="!w-[18px] !h-[18px] !text-[18px]">tune</mat-icon>
                <span class="text-[14px] font-normal tracking-wide">Tools</span>
              </button>

              <!-- Tools Dropdown Popup Menu: Floating popover opening upward from Tools button -->
              @if (state.isToolsMenuOpen()) {
                <div
                  class="absolute bottom-full left-0 mb-3 w-[230px] max-h-[300px] p-2 rounded-[16px] bg-[#2B2B2B] border border-[#3D3D3D] shadow-[0_15px_35px_rgba(0,0,0,0.65)] overflow-y-auto z-50 flex flex-col gap-1 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
                >
                  <div class="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#888888]">
                    Autonomous Tools
                  </div>

                  @for (tool of state.tools; track tool.id) {
                    <button
                      (click)="selectTool(tool)"
                      class="w-full h-[40px] px-3 rounded-[12px] flex items-center gap-2.5 text-left text-[13px] text-[#F5F5F5] hover:bg-[#383838] active:bg-[#444444] transition-colors cursor-pointer group"
                    >
                      <mat-icon class="!w-4 !h-4 !text-[16px] text-[#BDBDBD] group-hover:text-white transition-colors">
                        {{ tool.icon }}
                      </mat-icon>
                      <span class="font-normal truncate">{{ tool.name }}</span>
                    </button>
                  }
                </div>
              }
            </div>

            <!-- Right Side Controls -->
            <div class="flex items-center gap-2 sm:gap-3">
              <!-- Microphone Button: 44px circular, transparent/hover #383838, mic icon 20px. Red tint & pulse when active -->
              <button
                (click)="state.toggleVoiceInput()"
                [class.bg-rose-950]="state.isListening()"
                [class.text-rose-400]="state.isListening()"
                [class.border-rose-700]="state.isListening()"
                [class.animate-pulse]="state.isListening()"
                class="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] rounded-full flex items-center justify-center text-[#BDBDBD] hover:text-[#F5F5F5] hover:bg-[#383838] active:scale-95 transition-all cursor-pointer"
                title="Voice input"
                aria-label="Voice input"
              >
                <mat-icon class="!w-[20px] !h-[20px] !text-[20px]">
                  {{ state.isListening() ? 'mic' : 'mic_none' }}
                </mat-icon>
              </button>

              <!-- Submit Arrow Button: 44px/48px circular, solid off-white #F5F5F5, dark upward arrow icon 20px (#1F1F1F), hover transition to pure white -->
              <button
                (click)="state.submitPrompt()"
                class="w-[44px] sm:w-[48px] h-[44px] sm:h-[48px] rounded-full bg-[#F5F5F5] hover:bg-white text-[#1F1F1F] flex items-center justify-center active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
                title="Submit prompt"
                aria-label="Submit message"
              >
                <mat-icon class="!w-[20px] !h-[20px] !text-[20px] font-bold">arrow_upward</mat-icon>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick Suggested Prompts Pill Row for Instant Exploration -->
      <div class="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-[700px] text-center">
        <button
          (click)="setPrompt('Build a luxury dark-mode e-commerce brand for modern electric vehicles')"
          class="px-3.5 py-1.5 rounded-full bg-[#252525]/80 hover:bg-[#2B2B2B] border border-[#333333] hover:border-[#444444] text-[12px] text-[#BDBDBD] hover:text-white transition-all cursor-pointer"
        >
          ⚡ E-Commerce Storefront
        </button>
        <button
          (click)="setPrompt('Generate photorealistic 3D titanium brand graphics and packaging')"
          class="px-3.5 py-1.5 rounded-full bg-[#252525]/80 hover:bg-[#2B2B2B] border border-[#333333] hover:border-[#444444] text-[12px] text-[#BDBDBD] hover:text-white transition-all cursor-pointer"
        >
          🎨 3D Brand Graphics
        </button>
        <button
          (click)="setPrompt('Deploy automated AI B2B Lead qualification pipeline and Caller')"
          class="px-3.5 py-1.5 rounded-full bg-[#252525]/80 hover:bg-[#2B2B2B] border border-[#333333] hover:border-[#444444] text-[12px] text-[#BDBDBD] hover:text-white transition-all cursor-pointer"
        >
          🎯 Auto Leads & Caller
        </button>
      </div>

    </div>
  `
})
export class PromptBox {
  readonly state = inject(WorkspaceState);
  readonly textareaRef = viewChild<ElementRef<HTMLTextAreaElement>>('textareaRef');

  onInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.state.promptMessage.set(target.value);
    this.autoExpandTextarea(target);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.state.submitPrompt();
    }
  }

  setPrompt(text: string) {
    this.state.promptMessage.set(text);
    const textarea = this.textareaRef()?.nativeElement;
    if (textarea) {
      textarea.value = text;
      this.autoExpandTextarea(textarea);
      textarea.focus();
    }
  }

  selectTool(tool: ToolItem) {
    if (tool.routeView) {
      this.state.setView(tool.routeView);
    } else {
      this.state.promptMessage.set(`Run autonomous ${tool.name}: `);
      this.state.isToolsMenuOpen.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.state.addAttachedFile({
          id: `file-${Date.now()}-${i}`,
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          type: file.type
        });
      }
      input.value = '';
    }
  }

  private autoExpandTextarea(element: HTMLTextAreaElement) {
    element.style.height = 'auto';
    element.style.height = `${Math.min(element.scrollHeight, 180)}px`;
  }
}
