import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites:any[]

  constructor(private localStorage:localStorageService){


  }


  ngOnInit(): void {
    this.favorites=this.localStorage.getFavorites() || []
    // let storedFavorites=this.localStorage.getFavorites()
    // this.favorites=storedFavorites
  }


}
