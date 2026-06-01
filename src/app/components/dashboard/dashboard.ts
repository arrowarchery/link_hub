import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js'; // Import de Chart.js

Chart.register(...registerables);

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
        <h1>Tableau de Bord Precoluma</h1>
        <p>Analyse de performance des sources</p>
      </header>

      <div class="chart-wrapper">
        <canvas id="sourceChart"></canvas>
      </div>

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
              <td>{{ click.clickedAt | date:'dd/MM/yyyy HH:mm' }}</td>
              <td class="highlight">{{ click.targetUrl }}</td>
              <td>{{ click.source }}</td>
            </tr>
          </tbody>
        </table>
        
        <ng-template #noData>
          <p class="loading">Aucun clic enregistré...</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { min-height: 100vh; background-color: #050505; color: #ffffff; padding: 2rem; font-family: 'Montserrat', sans-serif; }
    header { margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem; }
    h1 { color: #dca78a; margin: 0; font-size: 1.8rem; }
    .chart-wrapper { background: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px; max-width: 400px; border: 1px solid #222; }
    .table-wrapper { background: #111; border-radius: 8px; padding: 1rem; border: 1px solid #222; overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 12px; border-bottom: 1px solid #333; color: #888; font-weight: 500; text-align: left; }
    td { padding: 12px; border-bottom: 1px solid #222; }
    .highlight { color: #dca78a; }
    .loading { text-align: center; color: #888; padding: 2rem; }
  `]
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  private apiUrl = 'https://linkhub-api.fly.dev/api/clicks'; 
  private statsUrl = 'https://linkhub-api.fly.dev/api/stats';
  
  clicks: ClickLog[] = [];
  chart: any;

  ngOnInit() {
    this.fetchClicks();
    this.fetchStats();
  }

  fetchClicks() {
    this.http.get<ClickLog[]>(this.apiUrl).subscribe(data => {
      this.clicks = data;
      this.cdr.detectChanges();
    });
  }

  fetchStats() {
    this.http.get<any[]>(this.statsUrl).subscribe(data => {
      this.renderChart(data);
    });
  }

  renderChart(data: any[]) {
    if (this.chart) this.chart.destroy(); // Nettoyer si déjà existant
    
    this.chart = new Chart("sourceChart", {
      type: 'pie',
      data: {
        labels: data.map(d => d.source),
        datasets: [{
          data: data.map(d => d.count),
          backgroundColor: ['#dca78a', '#444444', '#666666']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#ffffff' } }
        }
      }
    });
  }
}