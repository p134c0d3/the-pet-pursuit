import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class localStorageService{

  constructor(){}

  getData(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }



    private favorites: string[] = [];

    getFavorites(): string[] {
      return this.favorites;
    }

    addFavorite(item: any) {
      this.favorites.push(item);
      this.updateLocalStorage();
    }

    removeFavorite(key: string): void {
      localStorage.removeItem(key);
    }


    private updateLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
