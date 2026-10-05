import { Component } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-user-dashboard-page',
  styleUrl: './user-dashboard-page.scss',
  templateUrl: './user-dashboard-page.html',
})
export class UserDashboardPageComponent {
  pets = [
    { id: 1, name: 'Luna', species: 'Perro', age: 2, image: 'https://placehold.co/400x400/ff9800/white?text=Luna' },
    { id: 2, name: 'Milo', species: 'Gato', age: 1, image: 'https://placehold.co/400x400/4caf50/white?text=Milo' },
    { id: 3, name: 'Kira', species: 'Perro', age: 4, image: 'https://placehold.co/400x400/2196f3/white?text=Kira' }
  ];

  currentIndex = 0;

  get currentPet() {
    return this.pets[this.currentIndex];
  }

  nextPet(action: 'like' | 'pass') {
    console.log(`Acción: ${action} a la mascota ID: ${this.currentPet.id}`);
    this.currentIndex++;
  }
}
