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
  }
