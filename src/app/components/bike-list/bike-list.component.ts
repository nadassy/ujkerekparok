import { Component, OnInit } from '@angular/core';
import { BikeApiService } from '../../services/bikeapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrls: ['./bike-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BikeListComponent implements OnInit {
  bikes: any[] = [];

  constructor(private bikeApi: BikeApiService) {}

  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes() {
    this.bikeApi.getBikes().subscribe({
      next: (data) => {
        this.bikes = data.data; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}





