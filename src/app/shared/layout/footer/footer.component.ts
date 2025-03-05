import { Component, inject } from '@angular/core';
import { Router } from 'express';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private router = inject(Router);

  goToNotFound(): void {
    this.router.navigate(['/not-found']);
  }
}
