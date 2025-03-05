import { Component, inject } from '@angular/core';
import { Router } from 'express';
import { AngularMaterialModule } from '../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [AngularMaterialModule, FormsModule, RouterModule],
})
export class FooterComponent {
}
