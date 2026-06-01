import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router"; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="hub-container">
      <div class="glow-bg"></div>
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #050505;
      color: #ffffff;
      font-family: 'Montserrat', 'Cinzel', sans-serif;
    }
    .hub-container {
      position: relative;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      overflow: hidden;
    }
    .glow-bg {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(220, 167, 138, 0.12) 0%, rgba(5, 5, 5, 0) 70%);
      z-index: 0;
      pointer-events: none;
    }
  `]
})
export class App {}