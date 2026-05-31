import { Component } from '@angular/core';
import { LinkButton } from './components/link-button/link-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LinkButton],
  template: `
    <div class="container">
      <img src="votre-avatar.jpg" alt="Profile" class="avatar">
      <h1>ArrowArchery</h1>
      
      <!-- Lien principal MYM avec un style différencié -->
      <app-link-button url="https://mym.fans/Arrowarcherysex">
        🔥 ACCÈS EXCLUSIF MYM 🔞
      </app-link-button>

      <app-link-button url="https://instagram.com/votre-insta">
        Instagram
      </app-link-button>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: 0 auto; padding: 20px; text-align: center; }
    .avatar { width: 120px; border-radius: 50%; border: 3px solid #ccc; }
  `]
})
export class App {}