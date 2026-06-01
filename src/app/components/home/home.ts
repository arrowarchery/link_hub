import { Component } from '@angular/core';
import { LinkButton } from '../link-button/link-button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinkButton],
  template: `
    <div class="content-wrapper">
      <img src="/assets/logo.jpg" alt="ArrowArchery Logo" class="main-logo">
      
      <div class="links-section">
        <app-link-button 
          url="https://mym.fans/Arrowarcherysex" 
          [sourceName]="'MYM'" 
          class="luxury-link">
          ACCÈS EXCLUSIF 🔞
        </app-link-button>

        <app-link-button 
          url="https://www.instagram.com/arrowarcherysex/" 
          [sourceName]="'Instagram'" 
          class="luxury-link">
          INSTAGRAM
        </app-link-button>
      </div>
    </div>
  `,
  styles: [`
    .content-wrapper { width: 100%; max-width: 400px; margin: 0 auto; text-align: center; padding: 2rem 1rem; }
    .main-logo { width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 0 30px rgba(220, 167, 138, 0.2); }
    .links-section { display: flex; flex-direction: column; gap: 20px; }

    /* Le style commun "Luxe" basé sur votre logo */
    ::ng-deep .luxury-link a { 
      background: #0a0a0a !important; 
      border: 1px solid #dca78a !important; 
      color: #dca78a !important; 
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      transition: all 0.5s ease !important;
      position: relative;
    }
    
    ::ng-deep .luxury-link a:hover { 
      background: #1a1512 !important;
      box-shadow: 0 0 20px rgba(220, 167, 138, 0.3), inset 0 0 10px rgba(220, 167, 138, 0.1) !important;
      transform: translateY(-3px);
    }
  `]
})
export class Home {}