import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-authentication",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <h1>Componente de Autenticação</h1>
    <header class="row spacing">
      <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
          <li>
            <a
              class="nav-link"
              [routerLink]="['signup']"
              routerLinkActive="active"
              >SignUP</a
            >
          </li>
          <li>
            <a
              class="nav-link"
              [routerLink]="['signin']"
              routerLinkActive="active"
              >SignIN</a
            >
          </li>
          <li>
            <a
              class="nav-link"
              [routerLink]="['logout']"
              routerLinkActive="active"
              >LogOut</a
            >
          </li>
        </ul>
      </nav>
    </header>

    <router-outlet></router-outlet>
  `,
})
export class AuthenticationComponent {}
