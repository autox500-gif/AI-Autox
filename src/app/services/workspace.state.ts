import { Injectable, signal, computed } from '@angular/core';
import {
  AppView,
  ToolItem,
  AttachedFile,
  ChatHistoryItem,
  WebWorkspaceTab,
  DeviceView,
  CodeFile,
  ApiEndpoint,
  DbSchemaTable,
  GraphicItem,
  CrmDeal,
  LeadItem,
  PostItem
} from '../models/workspace.types';

interface WebSpeechRecognitionEvent {
  results: Record<number, Record<number, { transcript: string }>>;
}

interface WebSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: WebSpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class WorkspaceState {
  // Brand Logo URL
  readonly logoUrl = 'https://yu3rh9hejbczr3dy.public.blob.vercel-storage.com/Screenshot_20260823_000356_Instagram.jpg';

  // Navigation & View
  readonly currentView = signal<AppView>('main');
  readonly isSidebarCollapsed = signal<boolean>(true);
  readonly isMobileDrawerOpen = signal<boolean>(false);
  readonly isToolsMenuOpen = signal<boolean>(false);
  readonly isMoreMenuOpen = signal<boolean>(false);

  // User Profile
  readonly userName = signal<string>('AutoX User');
  readonly userEmail = signal<string>('');
  readonly userPlan = signal<string>('Free Plan');

  // Modals
  readonly isUpgradeModalOpen = signal<boolean>(false);
  readonly isOnboardingModalOpen = signal<boolean>(false);
  readonly onboardingStep = signal<number>(1);

  // Prompt Composer State
  readonly promptMessage = signal<string>('');
  readonly attachedFiles = signal<AttachedFile[]>([]);
  readonly isListening = signal<boolean>(false);

  // Web Workspace State (Starts Clean / Empty)
  readonly hasActiveProject = signal<boolean>(false);
  readonly projectTitle = signal<string>('');
  readonly webActiveTab = signal<WebWorkspaceTab>('preview');
  readonly webDeviceView = signal<DeviceView>('desktop');
  readonly webZoomLevel = signal<number>(100);
  readonly webSidebarWidth = signal<number>(280);
  readonly activeCodeFilePath = signal<string>('');
  readonly codeFiles = signal<CodeFile[]>([]);
  readonly apiEndpoints = signal<ApiEndpoint[]>([]);
  readonly dbTables = signal<DbSchemaTable[]>([]);

  // Graphics Workspace State (Starts Clean / Empty)
  readonly graphicsSidebarWidth = signal<number>(300);
  readonly selectedAspectRatio = signal<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  readonly selectedStyle = signal<string>('Minimalist Dark 3D');
  readonly graphicsPrompt = signal<string>('');
  readonly graphicsGallery = signal<GraphicItem[]>([]);

  // Business Suite State (Starts Clean / Empty)
  readonly crmDeals = signal<CrmDeal[]>([]);
  readonly leadsList = signal<LeadItem[]>([]);
  readonly postsList = signal<PostItem[]>([]);

  // Chat History (Starts Clean / Empty)
  readonly chatHistory = signal<ChatHistoryItem[]>([]);

  // Notification Toast
  readonly toastMessage = signal<string | null>(null);

  // Tools definition (Exact 10 tools from specification)
  readonly tools: ToolItem[] = [
    {
      id: 'graphics',
      name: 'Graphics',
      icon: 'image',
      description: 'AI visual generation, assets & branding',
      routeView: 'graphics'
    },
    {
      id: 'web',
      name: 'Web',
      icon: 'language',
      description: 'Full-stack responsive web apps & stores',
      routeView: 'web'
    },
    {
      id: 'posts',
      name: 'Posts',
      icon: 'description',
      description: 'Viral social campaigns & marketing copy',
      routeView: 'posts'
    },
    {
      id: 'auto-crm',
      name: 'Auto CRM',
      icon: 'business_center',
      description: 'Autonomous customer lifecycle & pipeline',
      routeView: 'crm'
    },
    {
      id: 'auto-leads',
      name: 'Auto Leads',
      icon: 'track_changes',
      description: 'B2B intent discovery & prospect enrichment',
      routeView: 'leads'
    },
    {
      id: 'auto-reply',
      name: 'Auto Reply',
      icon: 'reply',
      description: 'Multi-channel customer service responder',
      routeView: 'reply'
    },
    {
      id: 'auto-caller',
      name: 'Auto Caller',
      icon: 'phone_in_talk',
      description: 'Ultra-low latency conversational voice AI',
      routeView: 'caller'
    },
    {
      id: 'auto-email',
      name: 'Auto Email',
      icon: 'mail',
      description: 'High-converting personalized email sequences',
      routeView: 'email'
    },
    {
      id: 'auto-network',
      name: 'Auto Network',
      icon: 'share',
      description: 'Cross-platform influencer & channel growth',
      routeView: 'network'
    },
    {
      id: 'auto-connect',
      name: 'Auto Connect',
      icon: 'link',
      description: 'API integrations, webhooks & backend sync',
      routeView: 'connect'
    }
  ];

  // Active code file computed
  readonly activeCodeFile = computed(() => {
    const files = this.codeFiles();
    if (files.length === 0) return null;
    const path = this.activeCodeFilePath();
    return files.find(f => f.path === path) || files[0];
  });

  // State Mutators
  setView(view: AppView) {
    this.currentView.set(view);
    this.isToolsMenuOpen.set(false);
    this.isMoreMenuOpen.set(false);
    this.isMobileDrawerOpen.set(false);
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(v => !v);
  }

  toggleMobileDrawer() {
    this.isMobileDrawerOpen.update(v => !v);
  }

  toggleToolsMenu() {
    this.isToolsMenuOpen.update(v => !v);
  }

  toggleMoreMenu() {
    this.isMoreMenuOpen.update(v => !v);
  }

  openUpgradeModal() {
    this.isUpgradeModalOpen.set(true);
    this.isToolsMenuOpen.set(false);
  }

  closeUpgradeModal() {
    this.isUpgradeModalOpen.set(false);
  }

  openOnboardingModal(step = 1) {
    this.onboardingStep.set(step);
    this.isOnboardingModalOpen.set(true);
  }

  closeOnboardingModal() {
    this.isOnboardingModalOpen.set(false);
  }

  showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3200);
  }

  addAttachedFile(file: AttachedFile) {
    this.attachedFiles.update(files => [...files, file]);
    this.showToast(`Attached: ${file.name}`);
  }

  removeAttachedFile(id: string) {
    this.attachedFiles.update(files => files.filter(f => f.id !== id));
  }

  toggleVoiceInput() {
    if (this.isListening()) {
      this.isListening.set(false);
      this.showToast('Voice input stopped');
    } else {
      this.isListening.set(true);
      this.showToast('Listening... Speak your prompt');

      // Attempt native speech recognition if available in browser
      const SpeechRecognition =
        (window as unknown as { SpeechRecognition?: new () => WebSpeechRecognition }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: new () => WebSpeechRecognition }).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = 'en-US';
          recognition.onresult = (event: WebSpeechRecognitionEvent) => {
            const transcript = event.results[0]?.[0]?.transcript;
            if (transcript) {
              this.promptMessage.set(transcript);
              this.showToast('Voice transcribed');
            }
            this.isListening.set(false);
          };
          recognition.onerror = () => {
            this.isListening.set(false);
          };
          recognition.onend = () => {
            this.isListening.set(false);
          };
          recognition.start();
        } catch {
          this.isListening.set(false);
        }
      } else {
        // Fallback for environments without speech recognition API
        setTimeout(() => {
          if (this.isListening()) {
            this.isListening.set(false);
            this.showToast('Voice input completed');
          }
        }, 3000);
      }
    }
  }

  submitPrompt() {
    const text = this.promptMessage().trim();
    if (!text && this.attachedFiles().length === 0) {
      this.showToast('Please type a prompt or select a tool');
      return;
    }

    const lower = text.toLowerCase();
    let targetView: AppView = 'web';

    if (lower.includes('graphic') || lower.includes('logo') || lower.includes('render') || lower.includes('image') || lower.includes('photo')) {
      targetView = 'graphics';
      this.graphicsPrompt.set(text);
    } else if (lower.includes('lead') || lower.includes('prospect')) {
      targetView = 'leads';
    } else if (lower.includes('crm') || lower.includes('contact') || lower.includes('customer')) {
      targetView = 'crm';
    } else if (lower.includes('call') || lower.includes('voice') || lower.includes('phone')) {
      targetView = 'caller';
    } else if (lower.includes('mail') || lower.includes('email') || lower.includes('sequence')) {
      targetView = 'email';
    } else if (lower.includes('post') || lower.includes('social') || lower.includes('viral')) {
      targetView = 'posts';
    } else {
      targetView = 'web';
      this.generateWebProject(text || 'New Business Project');
    }

    // Add record to chat history dynamically
    const newChat: ChatHistoryItem = {
      id: `chat-${Date.now()}`,
      title: text.length > 32 ? text.substring(0, 32) + '...' : text || 'New Project',
      timestamp: 'Just now',
      preview: text,
      view: targetView
    };
    this.chatHistory.update(list => [newChat, ...list]);

    this.showToast(`AutoX: Opening ${targetView.toUpperCase()} Workspace...`);
    setTimeout(() => {
      this.setView(targetView);
    }, 300);
  }

  createNewChat() {
    this.promptMessage.set('');
    this.attachedFiles.set([]);
    this.setView('main');
    this.showToast('Started new conversation');
  }

  loadChatSession(item: ChatHistoryItem) {
    this.setView(item.view);
    this.showToast(`Loaded: ${item.title}`);
  }

  deleteChatSession(id: string, event: Event) {
    event.stopPropagation();
    this.chatHistory.update(list => list.filter(item => item.id !== id));
    this.showToast('Chat session removed');
  }

  generateWebProject(title: string) {
    this.projectTitle.set(title);
    this.hasActiveProject.set(true);

    const generatedCode = `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] font-sans">
      <header className="border-b border-[#2A2A2A] px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-medium tracking-tight text-white">${title}</h1>
        <button className="px-4 py-2 bg-white text-black font-semibold text-xs rounded-lg hover:bg-neutral-200 transition-colors">
          Get Started
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-light tracking-tight text-white mb-4">
          Welcome to ${title}
        </h2>
        <p className="text-base text-[#9E9E9E] max-w-xl mx-auto mb-8 font-normal">
          Autonomous workspace generated by AutoX. Ready for custom components, responsive layout, and API integration.
        </p>
      </main>
    </div>
  );
}`;

    this.codeFiles.set([
      {
        name: 'App.tsx',
        path: 'src/App.tsx',
        language: 'tsx',
        icon: 'code',
        content: generatedCode
      },
      {
        name: 'api.ts',
        path: 'server/api.ts',
        language: 'typescript',
        icon: 'dns',
        content: `import express from 'express';\nexport const router = express.Router();\n\nrouter.get('/api/health', (req, res) => {\n  res.json({ status: 'ok', service: '${title}' });\n});`
      }
    ]);

    this.activeCodeFilePath.set('src/App.tsx');

    this.apiEndpoints.set([
      {
        method: 'GET',
        path: '/api/v1/status',
        description: 'Health check and deployment telemetry',
        latency: '14ms',
        status: 200,
        sampleResponse: JSON.stringify({ status: 'active', app: title, timestamp: new Date().toISOString() }, null, 2)
      }
    ]);

    this.dbTables.set([
      {
        name: 'WorkspaceItem',
        description: 'Primary entity schema for project storage',
        columns: [
          { name: 'id', type: 'UUID', isPrimary: true },
          { name: 'created_at', type: 'TIMESTAMPTZ' },
          { name: 'metadata', type: 'JSONB' }
        ]
      }
    ]);
  }

  generateNewGraphic() {
    const prompt = this.graphicsPrompt().trim();
    if (!prompt) {
      this.showToast('Please enter a prompt to render a graphic');
      return;
    }

    const aspect = this.selectedAspectRatio();
    const style = this.selectedStyle();

    this.showToast('AutoX AI: Rendering asset...');
    const newItem: GraphicItem = {
      id: `g-${Date.now()}`,
      prompt,
      aspectRatio: aspect,
      style,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      timestamp: 'Just now'
    };

    setTimeout(() => {
      this.graphicsGallery.update(list => [newItem, ...list]);
      this.showToast('Graphic generated successfully');
    }, 1000);
  }
}
