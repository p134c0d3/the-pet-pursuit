export class User {
  constructor(
    // public fullname?:string,
    public email:string,
    public id:string,
    private _token:string,
    // private _tokenExpirationDate:Date
    ) {}

    // return this._token
  }


// get token(){

//   if(!this._tokenExpirationDate|| new Date () > this._tokenExpirationDate){
//     return null
//   }
//    return this._token
// }
// }
