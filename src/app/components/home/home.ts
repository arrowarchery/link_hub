import { Component } from '@angular/core';
import { LinkButton } from '../link-button/link-button'; // Vérifiez le chemin d'import !

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinkButton],
  template: `
    <div class="links-section">
      <app-link-button url="https://mym.fans/Arrowarcherysex" sourceName="MYM" class="premium-link">
         ACCÈS EXCLUSIF 🔞
      </app-link-button>

      <app-link-button url="https://www.instagram.com/arrowarcherysex/" sourceName="Instagram" class="standard-link">
         Instagram
      </app-link-button>
    </div>
  `,
  styles: [`
    .content-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 400px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }
    .main-logo { width: 100%; max-width: 320px; margin: 0 auto; border-radius: 8px; }
    .brand-title {
      font-size: 1.6rem; letter-spacing: 4px; margin: 0;
      background: linear-gradient(to right, #e5b89c, #dca78a, #e5b89c);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-transform: uppercase; font-weight: 600;
    }
    .brand-subtitle { font-size: 0.85rem; color: #888888; letter-spacing: 3px; margin-top: -10px; margin-bottom: 10px; }
    .links-section { display: flex; flex-direction: column; gap: 15px; }
    
    ::ng-deep .premium-link a {
      background: linear-gradient(145deg, #1a1a1a, #0a0a0a) !important;
      border: 1px solid #dca78a !important; color: #dca78a !important;
      box-shadow: 0 4px 15px rgba(220, 167, 138, 0.15) !important;
      text-transform: uppercase; letter-spacing: 1px; font-weight: 600;
    }
    ::ng-deep .premium-link a:hover {
      box-shadow: 0 6px 20px rgba(220, 167, 138, 0.3) !important;
      transform: translateY(-2px) !important;
    }
    ::ng-deep .standard-link a {
      background: #111111 !important; border: 1px solid #333333 !important;
      color: #aaaaaa !important; font-weight: 400;
    }
    ::ng-deep .standard-link a:hover {
      border-color: #555555 !important; background: #1a1a1a !important; color: #ffffff !important;
    }
  `]
})
export class Home {}