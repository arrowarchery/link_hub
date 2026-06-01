import { Component, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-link-button',
  standalone: true,
  template: `
    <!-- On utilise un (click) pour déclencher le tracking -->
    <a [href]="url" target="_blank" class="link-btn" (click)="trackClick()">
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    .link-btn {
      display: block;
      width: 100%;
      padding: 1rem;
      margin: 10px 0;
      background: #1a1a1a;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: 12px;
      font-weight: bold;
      transition: transform 0.2s, background 0.3s;
      border: 2px solid #333;
    }
    .link-btn:hover {
      background: #333;
      transform: scale(1.02);
    }
  `]
})
export class LinkButton {
  @Input() url!: string;
  @Input() sourceName: string = 'Instagram'; // Par défaut

  private http = inject(HttpClient);
  private apiUrl = 'https://linkhub-api.fly.dev/api/track-click';

  trackClick() {
    const payload = {
      targetUrl: this.url,
      source: this.sourceName
    };

    // Le clic est envoyé en arrière-plan (fire and forget) pour ne pas ralentir la redirection de l'utilisateur
    this.http.post(this.apiUrl, payload).subscribe({
      error: (err) => console.error('Erreur de tracking', err)
    });
  }
}