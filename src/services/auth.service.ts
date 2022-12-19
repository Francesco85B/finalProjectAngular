import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginDTO, RegisterDTO, User } from "models/user"
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}
  springBootUrl = "http://localhost:8080/api/public";



  login(loginData: LoginDTO) {
    console.log("auth service.ts", loginData);

    localStorage.setItem("user", JSON.stringify(loginData.username));
    

    return this.http.post<Partial<LoginDTO>>(
      `${this.springBootUrl}/signIn`, loginData);
  }

  register(registerData: RegisterDTO) {

    this.router.navigateByUrl("/");
    return this.http.post<RegisterDTO>(`${this.springBootUrl}/signUp`, registerData);
  }

  logout() {
    localStorage.removeItem("user");
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem("user") || "") as User;
    return user;
  }
}
