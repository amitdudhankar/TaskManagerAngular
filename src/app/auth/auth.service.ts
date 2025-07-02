import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // JSON Server users endpoint

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(users[0]));
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  signup(email: string, password: string): Observable<boolean> {
  return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
    switchMap(users => {
      if (users.length > 0) {
        return of(false); // Email already exists
      } else {
        return this.http.post(this.apiUrl, { email, password }).pipe(
          map(() => true),
          catchError(() => of(false))
        );
      }
    }),
    catchError(() => of(false))
  );
}


  logout(): void {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
