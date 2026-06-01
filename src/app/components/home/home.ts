import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LinkButton } from '../link-button/link-button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LinkButton],
  template: `
    <div class="content-wrapper fade-in">
      <img src="/assets/logo.jpg" alt="ArrowArchery Logo" class="main-logo">
      
      <div class="links-section">
        <app-link-button url="https://mym.fans/Arrowarcherysex" [sourceName]="'MYM'" class="luxury-link">
          ACCÈS EXCLUSIF 🔞
        </app-link-button>

        <app-link-button url="https://www.instagram.com/arrowarcherysex/" [sourceName]="'Instagram'" class="luxury-link">
          INSTAGRAM
        </app-link-button>
        
        <app-link-button url="https://fr.stripchat.com/ArrowArcherySex/profile" [sourceName]="'Stripchat'" class="luxury-link">
          STRIPCHAT
        </app-link-button>
      </div>

      <div class="agenda-section" *ngIf="events.length > 0">
        <h3 class="agenda-title">Prochains Lives</h3>
        <div class="event-card" *ngFor="let e of events">
          <span class="event-date">{{ e.date | date:'dd/MM' }}</span>
          <span class="event-title">{{ e.title }}</span>
          <span class="event-time">{{ e.time }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fade-in { animation: fadeIn 1s ease-in; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .content-wrapper { width: 100%; max-width: 400px; margin: 0 auto; text-align: center; padding: 2rem 1rem; }
    .main-logo { width: 100%; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 0 30px rgba(220, 167, 138, 0.2); }
    .links-section { display: flex; flex-direction: column; gap: 20px; margin-bottom: 3rem; }

    /* Style Agenda Luxe */
    .agenda-section { color: #dca78a; margin-top: 1rem; }
    .agenda-title { text-transform: uppercase; letter-spacing: 3px; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .event-card { 
      display: flex; justify-content: space-between; align-items: center;
      background: #0a0a0a; border: 1px solid #dca78a; padding: 1rem;
      border-radius: 8px; margin-bottom: 10px; font-size: 0.85rem;
    }

    /* Boutons Luxe */
    ::ng-deep .luxury-link a { 
      background: #0a0a0a !important; border: 1px solid #dca78a !important; color: #dca78a !important; 
      text-transform: uppercase; letter-spacing: 2px; font-weight: 700;
      transition: all 0.5s ease !important; position: relative;
    }
    ::ng-deep .luxury-link a:hover { 
      background: #1a1512 !important;
      box-shadow: 0 0 20px rgba(220, 167, 138, 0.3) !important;
      transform: translateY(-3px);
    }
  `]
})
export class Home implements OnInit {
  private http = inject(HttpClient);
  events: any[] = [];

  ngOnInit() {
    this.http.get<any[]>('https://linkhub-api.fly.dev/api/events').subscribe({
      next: (data) => this.events = data,
      error: () => console.log('Agenda vide ou API inaccessible')
    });
  }
}