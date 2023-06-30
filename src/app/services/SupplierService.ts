import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { PopularSuppliersResponse } from "../models/responseModel/popular-suppliers-response.model";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPopularSuppliers() {
    return this.http.get<PopularSuppliersResponse>(`${this.apiUrl}api/Supplier/GetPopularitySupplier`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong');
      })
    );
  }
}
