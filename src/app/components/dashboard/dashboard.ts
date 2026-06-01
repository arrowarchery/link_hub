import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// Le modèle qui correspond exactement à ce que renvoie C#
interface ClickLog {
  id: number;
  targetUrl: string;
  source: string;
  clickedAt: string;
  userAgent: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <header>
        <h1>Panneau d'Administration</h1>
        <p>Statistiques des clics en temps réel</p>
      </header>

      <div class="table-wrapper">
        <table *ngIf="clicks && clicks.length > 0; else noData">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date & Heure</th>
              <th>Lien Cible</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let click of clicks">
              <td>#{{ click.id }}</td>
              <!-- Formater la date proprement -->
              <td>{{ click.clickedAt | date:'dd/MM/yyyy HH:mm' }}</td>
              <td class="highlight">{{ click.targetUrl }}</td>
            </tr>
          </tbody>
        </table>
        
        <ng-template #noData>
          <p class="loading">Chargement des données ou aucun clic enregistré...</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      background-color: #050505;
      color: #ffffff;
      padding: 2rem;
      font-family: 'Montserrat', sans-serif;
    }
    header { margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem; }
    h1 { color: #dca78a; margin: 0; font-size: 1.8rem; }
    p { color: #888; font-size: 0.9rem; }
    
    .table-wrapper {
      background: #111;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #222;
      overflow-x: auto;
    }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { padding: 12px; border-bottom: 1px solid #333; color: #888; font-weight: 500; }
    td { padding: 12px; border-bottom: 1px solid #222; }
    .highlight { color: #dca78a; }
    tr:hover { background-color: #1a1a1a; }
    .loading { text-align: center; color: #888; padding: 2rem; }
  `]
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  // Remplacez par l'URL exacte de votre API Fly.io
  private apiUrl = 'https://linkhub-api.fly.dev/api/clicks'; 
  
  clicks: ClickLog[] = [];

  ngOnInit() {
    this.fetchClicks();
  }

fetchClicks() {
    this.http.get<ClickLog[]>(this.apiUrl).subscribe((data) => {
      this.clicks = data;
      this.cdr.detectChanges(); // 2. Forcer Angular à rafraîchir la vue
    });
  }
}