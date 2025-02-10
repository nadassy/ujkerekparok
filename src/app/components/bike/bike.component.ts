import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BikeApiService } from '../../services/bikeapi.service';
import { BikeListComponent } from '../bike-list/bike-list.component';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, BikeListComponent]
})
export class BikeComponent {
  bikeForm!: FormGroup;

  @ViewChild(BikeListComponent) bikeListComponent!: BikeListComponent;

  constructor(
    private builder: FormBuilder,
    private bikeApi: BikeApiService
  ) {}

  ngOnInit() {
    this.bikeForm = this.builder.group({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  addBike() {
    this.bikeApi.addBike(this.bikeForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.bikeForm.reset();
        this.bikeListComponent.loadBikes(); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


