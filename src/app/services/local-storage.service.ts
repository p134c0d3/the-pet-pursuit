import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class localStorageService{

  constructor(){
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

  }

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

  newPostFormData(): void {
    localStorage.setItem('newPostFormData', JSON.stringify(this.newPostFormData));
  }

  getNewPostFormData(): any {
    const formValue = localStorage.getItem('newPostFormData');
    if (formValue) {
      return JSON.parse(formValue);
    }
    return null;
  }


    private favorites: any[] = [];

    // private favorites:Set<any>

    getFavorites(): any[] {
      return this.favorites;
    }


    // addFavorite(item: any) {
    //   this.favorites.push(item);
    //   this.updateLocalStorage();
    // }

    addFavorite(item: any) {
      if(!this.favorites.some(fav=>
       fav.id==item.id )){
        this.favorites.push(item);

        this.updateLocalStorage();

      }
    }


    // removeFavorite(key: string): void {
    //   // localStorage.removeItem(key);

    // }


    removeFavorite(index: number): void {
      // localStorage.removeItem(key);
      if(index>=0 && index <this.favorites.length){
        this.favorites.splice(index,1)
      }

    }




    public updateLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
