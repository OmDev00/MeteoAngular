import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  city: string = '';
  @Output() search = new EventEmitter<string>();

  searchCity(cityInput: string) {
    this.search.emit(cityInput);
  }
}
