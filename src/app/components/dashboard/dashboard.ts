import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Indispensable pour ngModel
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ClickLog { id: number; targetUrl: string; source: string; clickedAt: string; }

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule ajouté ici
  template: `
    <div class="admin-container">
      <h1>Tableau de Bord Precoluma</h1>

      <div class="chart-wrapper">
        <canvas id="sourceChart"></canvas>
      </div>

      <!-- Section Agenda -->
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
        <table>
          <tr *ngFor="let click of clicks">
            <td>#{{ click.id }}</td>
            <td>{{ click.clickedAt | date:'short' }}</td>
            <td class="highlight">{{ click.targetUrl }}</td>
            <td>{{ click.source }}</td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 2rem; background: #050505; color: white; }
    .admin-panel { background: #111; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #dca78a; }
    input { background: #000; border: 1px solid #333; color: white; padding: 10px; margin-right: 10px; border-radius: 4px; }
    button { background: #dca78a; border: none; padding: 10px 20px; cursor: pointer; font-weight: bold; }
  `]
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  clicks: ClickLog[] = [];
  newEvent = { title: '', date: '', time: '' }; // Déclaration ajoutée

  ngOnInit() {
    this.fetchClicks();
  }

  fetchClicks() {
    this.http.get<ClickLog[]>('https://linkhub-api.fly.dev/api/clicks').subscribe(data => {
      this.clicks = data;
    });
  }

  addEvent() {
    this.http.post('https://linkhub-api.fly.dev/api/events', this.newEvent).subscribe(() => {
      alert('Événement ajouté !');
      this.newEvent = { title: '', date: '', time: '' };
    });
  }
}