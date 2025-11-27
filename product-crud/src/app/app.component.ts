import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Product CRUD</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem 1.5rem;
    }
    header {
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }
    h1 {
      margin: 0 0 .75rem;
      font-size: 1.5rem;
    }
    main {
      margin-top: 1rem;
    }
  `]
})
export class AppComponent {}
