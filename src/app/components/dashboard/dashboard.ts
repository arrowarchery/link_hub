import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ClickLog { id: number; targetUrl: string; source: string; clickedAt: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <header>
        <h1>Tableau de Bord</h1>
        <p>Analyse de performance des sources</p>
      </header>

      <div class="chart-wrapper">
        <canvas id="sourceChart"></canvas>
      </div>

      <div class="admin-panel">
        <h3>Ajouter un événement</h3>
        <div class="form-group">
          <input [(ngModel)]="newEvent.title" placeholder="Titre (ex: Live)">
          <input [(ngModel)]="newEvent.date" type="date">
          <input [(ngModel)]="newEvent.time" placeholder="Heure">
          <button (click)="addEvent()">Ajouter</button>
        </div>
      </div>

      <div class="table-wrapper">
        <table *ngIf="clicks && clicks.length > 0; else noData">
          <thead>
            <tr><th>ID</th><th>Date & Heure</th><th>Lien Cible</th><th>Source</th></tr>
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
    .admin-container { min-height: 100vh; background-color: #050505; color: #ffffff; padding: 2rem; }
    header { margin-bottom: 2rem; border-bottom: 1px solid #333; padding-bottom: 1rem; }
    h1 { color: #dca78a; margin: 0; font-size: 1.8rem; }
    .chart-wrapper { background: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px; max-width: 400px; height: 300px; border: 1px solid #222; }
    .table-wrapper { background: #111; border-radius: 8px; padding: 1rem; border: 1px solid #222; overflow-x: auto; }
    .admin-panel { background: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #dca78a; }
    input { background: #000; border: 1px solid #333; color: white; padding: 10px; margin-right: 10px; border-radius: 4px; }
    button { background: #dca78a; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; }
    .highlight { color: #dca78a; }
    .loading { text-align: center; color: #888; padding: 2rem; }
  `]
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  clicks: ClickLog[] = [];
  newEvent = { title: '', date: '', time: '' };
  chart: any;

  ngOnInit() {
    this.fetchClicks();
    this.fetchStats();
  }

  fetchClicks() {
    this.http.get<ClickLog[]>('https://linkhub-api.fly.dev/api/clicks').subscribe(data => {
      this.clicks = data;
      this.cdr.detectChanges();
    });
  }

  fetchStats() {
    this.http.get<any[]>('https://linkhub-api.fly.dev/api/stats').subscribe(data => {
      setTimeout(() => this.renderChart(data), 0);
    });
  }

  renderChart(data: any[]) {
    if (this.chart) this.chart.destroy();
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
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#ffffff' } } }
      }
    });
  }

  addEvent() {
    this.http.post('https://linkhub-api.fly.dev/api/events', this.newEvent).subscribe(() => {
      alert('Événement ajouté !');
      this.newEvent = { title: '', date: '', time: '' };
    });
  }
}