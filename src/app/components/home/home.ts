import { Component } from '@angular/core';
import { LinkButton } from '../link-button/link-button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinkButton],
  template: `
    <div class="links-section">
      <app-link-button 
        url="https://mym.fans/Arrowarcherysex" 
        [sourceName]="'MYM'" 
        class="premium-link">
        ACCÈS EXCLUSIF 🔞
      </app-link-button>

      <app-link-button 
        url="https://www.instagram.com/arrowarcherysex/" 
        [sourceName]="'Instagram'" 
        class="standard-link">
        Instagram
      </app-link-button>
    </div>
  `,
  styles: [`
    .links-section { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 400px; margin: 0 auto; }
    ::ng-deep .premium-link a { background: linear-gradient(145deg, #1a1a1a, #0a0a0a) !important; border: 1px solid #dca78a !important; color: #dca78a !important; }
    ::ng-deep .standard-link a { background: #111111 !important; border: 1px solid #333333 !important; color: #aaaaaa !important; }
  `]
})
export class Home {}