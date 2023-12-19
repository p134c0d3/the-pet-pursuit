import { Component, OnInit } from '@angular/core';
import { localStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites:any[]

  constructor(public localStorage:localStorageService){


  }


  ngOnInit(): void {
    this.favorites=this.localStorage.getFavorites() || []
    // let storedFavorites=this.localStorage.getFavorites()
    // this.favorites=storedFavorites
  }




  deleteFav(e){
    console.log(e)
    this.favorites.forEach((value,index) =>{
      if(value==e)

      this.favorites.splice(index,1)
      console.log(this.favorites)

      // Update local storage
      this.localStorage.updateLocalStorage();
    })

}

}
