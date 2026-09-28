import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WorkspaceState } from './services/workspace.state';
import { AppHeader } from './components/header/header';
import { PromptBox } from './components/prompt-box/prompt-box';
import { AppSidebar } from './components/sidebar/sidebar';
import { WebWorkspace } from './components/web-workspace/web-workspace';
import { GraphicsWorkspace } from './components/graphics-workspace/graphics-workspace';
import { BusinessSuite } from './components/business-suite/business-suite';
import { UpgradeModal } from './components/upgrade-modal/upgrade-modal';
import { OnboardingModal } from './components/onboarding-modal/onboarding-modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    AppHeader,
    PromptBox,
    AppSidebar,
    WebWorkspace,
    GraphicsWorkspace,
    BusinessSuite,
    UpgradeModal,
    OnboardingModal
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly state = inject(WorkspaceState);
}
