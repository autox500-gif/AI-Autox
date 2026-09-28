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
  GraphicItem
} from '../models/workspace.types';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceState {
  // Brand Logo URL
  readonly logoUrl = 'https://yu3rh9hejbczr3dy.public.blob.vercel-storage.com/Screenshot_20260823_000356_Instagram.jpg';

  // Navigation & View
  readonly currentView = signal<AppView>('main');
  readonly isSidebarCollapsed = signal<boolean>(true); // Matches screenshot 76px rail initially
  readonly isMobileDrawerOpen = signal<boolean>(false);
  readonly isToolsMenuOpen = signal<boolean>(false);
  readonly isMoreMenuOpen = signal<boolean>(false);

  // Modals
  readonly isUpgradeModalOpen = signal<boolean>(false);
  readonly isOnboardingModalOpen = signal<boolean>(false);
  readonly onboardingStep = signal<number>(1);

  // Prompt Composer State
  readonly promptMessage = signal<string>('');
  readonly attachedFiles = signal<AttachedFile[]>([]);
  readonly isListening = signal<boolean>(false);

  // Web Workspace State
  readonly webActiveTab = signal<WebWorkspaceTab>('preview');
  readonly webDeviceView = signal<DeviceView>('desktop');
  readonly webZoomLevel = signal<number>(100);
  readonly webSidebarWidth = signal<number>(280);
  readonly activeCodeFilePath = signal<string>('src/App.tsx');

  // Graphics Workspace State
  readonly graphicsSidebarWidth = signal<number>(300);
  readonly selectedAspectRatio = signal<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  readonly selectedStyle = signal<string>('Minimalist Dark 3D');
  readonly graphicsPrompt = signal<string>('Luxury modern electric vehicle in dark titanium studio lighting, subtle rim illumination');

  // Notification Toast
  readonly toastMessage = signal<string | null>(null);

  // Tools definition (Exact 10 tools from prompt)
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

  // Recent chat history
  readonly chatHistory = signal<ChatHistoryItem[]>([
    {
      id: 'chat-1',
      title: 'E-Commerce Brand Storefront',
      timestamp: '10m ago',
      preview: 'Created minimalist dark luxury automotive accessories shop...',
      view: 'web'
    },
    {
      id: 'chat-2',
      title: 'High-Converting B2B Lead Funnel',
      timestamp: '2h ago',
      preview: 'Generated automated email sequencing and qualification matrix...',
      view: 'leads'
    },
    {
      id: 'chat-3',
      title: 'Cyberpunk 3D Brand Graphics',
      timestamp: 'Yesterday',
      preview: 'Rendered dark titanium 1:1 isometric logos...',
      view: 'graphics'
    },
    {
      id: 'chat-4',
      title: 'Auto CRM Sales Pipeline',
      timestamp: '3d ago',
      preview: 'Configured automated follow-ups and deals synchronization...',
      view: 'crm'
    }
  ]);

  // Code files for Web Workspace
  readonly codeFiles: CodeFile[] = [
    {
      name: 'App.tsx',
      path: 'src/App.tsx',
      language: 'tsx',
      icon: 'code',
      content: `import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { CTA } from './components/CTA';

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <div className="min-h-screen bg-[#121212] text-[#EFEFEF] font-sans selection:bg-[#333]">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#121212]/80 border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center font-bold text-black text-xs">
            AX
          </div>
          <span className="font-semibold text-lg tracking-tight">AutoX Store</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#A0A0A0]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <button className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors">
          Get Started
        </button>
      </header>

      <main>
        <Hero />
        <Features />
        <Pricing billingCycle={billingCycle} onToggle={setBillingCycle} />
        <CTA />
      </main>
    </div>
  );
}`
    },
    {
      name: 'Hero.tsx',
      path: 'src/components/Hero.tsx',
      language: 'tsx',
      icon: 'view_quilt',
      content: `import React from 'react';

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-6 max-w-6xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#333] text-xs text-[#BDBDBD] mb-8">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Autonomous AI Business Engine 2.0
      </div>
      <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-6 max-w-3xl mx-auto">
        Launch, Scale & Automate Your Business in Seconds
      </h1>
      <p className="text-lg text-[#9E9E9E] max-w-2xl mx-auto mb-10 font-normal">
        From graphics and high-converting web storefronts to autonomous CRM, caller agents, and email syndication.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-lg">
          Start Autonomous Free Trial
        </button>
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#262626] border border-[#3D3D3D] text-white font-medium text-sm hover:bg-[#303030] transition-all">
          Explore Interactive Demo
        </button>
      </div>
    </section>
  );
}`
    },
    {
      name: 'Pricing.tsx',
      path: 'src/components/Pricing.tsx',
      language: 'tsx',
      icon: 'attach_money',
      content: `import React from 'react';

export function Pricing({ billingCycle, onToggle }: { billingCycle: 'monthly' | 'yearly'; onToggle: (c: 'monthly' | 'yearly') => void }) {
  return (
    <section id="pricing" className="py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-white mb-3">Simple Transparent Plans</h2>
        <p className="text-sm text-[#888]">Everything you need to run your business autonomously.</p>
        <div className="mt-6 inline-flex p-1 bg-[#1F1F1F] border border-[#333] rounded-xl">
          <button
            onClick={() => onToggle('monthly')}
            className={\`px-4 py-1.5 rounded-lg text-xs font-medium transition-all \${billingCycle === 'monthly' ? 'bg-[#333] text-white' : 'text-[#888]'}\`}
          >
            Monthly
          </button>
          <button
            onClick={() => onToggle('yearly')}
            className={\`px-4 py-1.5 rounded-lg text-xs font-medium transition-all \${billingCycle === 'yearly' ? 'bg-[#333] text-white' : 'text-[#888]'}\`}
          >
            Annual (Save 20%)
          </button>
        </div>
      </div>
    </section>
  );
}`
    },
    {
      name: 'api.ts',
      path: 'server/api.ts',
      language: 'typescript',
      icon: 'dns',
      content: `import express from 'express';
export const router = express.Router();

router.get('/api/v1/leads', async (req, res) => {
  res.json({
    success: true,
    total: 1240,
    leads: [
      { id: 'ld_91', name: 'Apex Logistics Corp', score: 98, status: 'Qualified' },
      { id: 'ld_92', name: 'Solaria Energy Inc', score: 94, status: 'In Sequence' },
      { id: 'ld_93', name: 'Vertex Bio Labs', score: 91, status: 'Meeting Booked' }
    ]
  });
});

router.post('/api/v1/leads/enrich', async (req, res) => {
  const { domain } = req.body;
  res.json({
    domain,
    enriched: true,
    companySize: '50-200',
    techStack: ['Next.js', 'PostgreSQL', 'Stripe'],
    decisionMakers: 4
  });
});`
    },
    {
      name: 'schema.prisma',
      path: 'prisma/schema.prisma',
      language: 'prisma',
      icon: 'storage',
      content: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      String   @default("Pro")
  createdAt DateTime @default(now())
  leads     Lead[]
  agents    Agent[]
}

model Lead {
  id         String   @id @default(cuid())
  orgId      String
  name       String
  email      String
  company    String
  score      Int      @default(0)
  status     String   @default("NEW")
  createdAt  DateTime @default(now())
  org        Organization @relation(fields: [orgId], references: [id])
}

model Agent {
  id         String   @id @default(cuid())
  name       String
  type       String   // CALLER | EMAIL | CRM | REPLY
  active     Boolean  @default(true)
  orgId      String
  org        Organization @relation(fields: [orgId], references: [id])
}`
    }
  ];

  // API Endpoints for Backend tab
  readonly apiEndpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/business/stats',
      description: 'Fetch real-time autonomous revenue, active leads, and caller metrics',
      latency: '18ms',
      status: 200,
      sampleResponse: JSON.stringify({
        revenueMRR: 48920,
        currency: 'USD',
        activeLeadsCount: 1420,
        voiceCallsCompleted: 384,
        avgLeadScore: 92.4,
        automationUptime: '99.98%'
      }, null, 2)
    },
    {
      method: 'POST',
      path: '/api/v1/leads/capture',
      description: 'Ingest inbound lead and trigger autonomous qualification agent',
      latency: '34ms',
      status: 201,
      sampleRequest: JSON.stringify({
        email: 'alex@enterprise-cloud.io',
        company: 'Enterprise Cloud Corp',
        source: 'Landing Page CTA',
        intentKeywords: ['Enterprise tier', 'SOC-2 compliant', 'AI Voice Caller']
      }, null, 2),
      sampleResponse: JSON.stringify({
        leadId: 'ld_882910',
        qualified: true,
        sentimentScore: 0.94,
        assignedSequence: 'high_value_enterprise_v2',
        firstCallScheduled: '2026-09-28T18:00:00Z'
      }, null, 2)
    },
    {
      method: 'GET',
      path: '/api/v1/crm/contacts',
      description: 'Query synchronized contacts with AI interaction transcripts',
      latency: '24ms',
      status: 200,
      sampleResponse: JSON.stringify({
        total: 320,
        page: 1,
        contacts: [
          { id: 'c_01', name: 'Sophia Chen', company: 'Nova Robotics', stage: 'Contract Sent', value: '$36,000' },
          { id: 'c_02', name: 'Marcus Vance', company: 'HyperScale AI', stage: 'Demo Completed', value: '$24,000' },
          { id: 'c_03', name: 'Liam Davies', company: 'Aero Dynamics', stage: 'Negotiation', value: '$72,000' }
        ]
      }, null, 2)
    },
    {
      method: 'POST',
      path: '/api/v1/agents/caller/dispatch',
      description: 'Dispatch an ultra-low latency voice agent call session',
      latency: '45ms',
      status: 200,
      sampleRequest: JSON.stringify({
        recipientPhone: '+1 (555) 234-8901',
        agentPersona: 'Samantha - Enterprise Account Executive',
        targetGoal: 'Schedule 20-min technical architecture review'
      }, null, 2),
      sampleResponse: JSON.stringify({
        callSessionId: 'call_99014b',
        status: 'Initiated',
        codec: 'opus_48khz',
        estimatedLatency: '180ms'
      }, null, 2)
    }
  ];

  // Database Schema tables
  readonly dbTables: DbSchemaTable[] = [
    {
      name: 'Organization',
      description: 'Tenant workspace entity and billing tier details',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'name', type: 'VARCHAR(255)' },
        { name: 'slug', type: 'VARCHAR(100)' },
        { name: 'plan', type: 'VARCHAR(50)' },
        { name: 'created_at', type: 'TIMESTAMPTZ' }
      ]
    },
    {
      name: 'Lead',
      description: 'Enriched B2B prospect records with algorithmic score',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'org_id', type: 'UUID' },
        { name: 'name', type: 'VARCHAR(255)' },
        { name: 'email', type: 'VARCHAR(255)' },
        { name: 'company', type: 'VARCHAR(255)' },
        { name: 'score', type: 'INTEGER' },
        { name: 'status', type: 'VARCHAR(50)' }
      ]
    },
    {
      name: 'AgentSession',
      description: 'Voice caller & multi-channel response interactions',
      columns: [
        { name: 'id', type: 'UUID', isPrimary: true },
        { name: 'agent_type', type: 'VARCHAR(50)' },
        { name: 'duration_seconds', type: 'INTEGER' },
        { name: 'sentiment', type: 'VARCHAR(50)' },
        { name: 'recording_url', type: 'VARCHAR(500)', isNullable: true }
      ]
    }
  ];

  // Graphics Gallery items
  readonly graphicsGallery = signal<GraphicItem[]>([
    {
      id: 'g-1',
      prompt: 'Minimalist dark titanium sports coupe, soft studio top lighting, 8k raytraced',
      aspectRatio: '16:9',
      style: 'Minimalist Dark 3D',
      imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
      timestamp: 'Just now'
    },
    {
      id: 'g-2',
      prompt: 'Sleek geometric prism brand logo in brushed dark obsidian metal, 1:1 format',
      aspectRatio: '1:1',
      style: 'Cyber Geometric',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      timestamp: '15m ago'
    },
    {
      id: 'g-3',
      prompt: 'Dark luxury architectural workspace interior with floor-to-ceiling glass and soft warm ambient aura',
      aspectRatio: '16:9',
      style: 'Photorealistic Studio',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      timestamp: '1h ago'
    },
    {
      id: 'g-4',
      prompt: 'High-contrast mobile typography poster with geometric layout and orange accents',
      aspectRatio: '9:16',
      style: 'Vector Editorial',
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
      timestamp: '3h ago'
    }
  ]);

  // Selected code file computed
  readonly activeCodeFile = computed(() => {
    const path = this.activeCodeFilePath();
    return this.codeFiles.find(f => f.path === path) || this.codeFiles[0];
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
      this.showToast('Voice typing stopped');
    } else {
      this.isListening.set(true);
      this.showToast('Voice typing active... Speak now');
      // Simulate real-time speech transcription
      const phrases = [
        'Build a luxury dark-mode e-commerce brand for electric performance vehicles with integrated checkout...',
        'Set up an autonomous B2B lead generation pipeline targeting fintech CEOs...',
        'Create a full-stack SaaS workspace with automated CRM follow-ups...'
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setTimeout(() => {
        if (this.isListening()) {
          this.promptMessage.set(randomPhrase);
          this.isListening.set(false);
          this.showToast('Voice recognized!');
        }
      }, 2500);
    }
  }

  submitPrompt() {
    const text = this.promptMessage().trim();
    if (!text && this.attachedFiles().length === 0) {
      this.showToast('Please type a prompt or select a tool');
      return;
    }

    const lower = text.toLowerCase();
    // Intelligent dispatch based on prompt content:
    let targetView: AppView = 'web';
    if (lower.includes('graphic') || lower.includes('logo') || lower.includes('render') || lower.includes('image') || lower.includes('photo')) {
      targetView = 'graphics';
      this.graphicsPrompt.set(text || 'Luxury automotive titanium concept');
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
    }

    // Add to chat history
    const newChat: ChatHistoryItem = {
      id: `chat-${Date.now()}`,
      title: text.length > 32 ? text.substring(0, 32) + '...' : text || 'New Business Project',
      timestamp: 'Just now',
      preview: text,
      view: targetView
    };
    this.chatHistory.update(list => [newChat, ...list]);

    this.showToast(`AutoX: Initializing ${targetView.toUpperCase()} Workspace...`);
    setTimeout(() => {
      this.setView(targetView);
    }, 400);
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

  generateNewGraphic() {
    const prompt = this.graphicsPrompt().trim() || 'Minimalist dark titanium sports concept';
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
    }, 1200);
  }
}
