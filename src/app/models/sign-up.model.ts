

export class SignUpUser {
  public userId: number;
  public fullname: string;
  public phone: string;
  public username: string;
  public email: string;
  private password: string;
  constructor(userId: number, fullname: string, phone: string, username: string, email: string, password: string)
  {
    this.userId = userId;
    this.fullname = fullname;
    this.phone = phone;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
