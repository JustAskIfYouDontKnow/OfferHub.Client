import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  popularSuppliers: any[] = [];
  searchTerm: string = '';
  offers: any[] = [];
  searchedTotalOffersCount: number = 0;
  totalOffersCount: number = 0;
  allOffers: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPopularSuppliers();
    this.getAllOffers();
  }

  getPopularSuppliers() {
    this.http.get<any>('http://localhost:5000/api/Supplier/GetPopularitySupplier').subscribe(response => {
      this.popularSuppliers = response;
    });
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.searchOffers();
    } else {
      this.offers = [];
      this.searchedTotalOffersCount = 0;
    }
  }

  searchOffers() {
    this.http.get<any>('http://localhost:5000/api/Offer/SearchOffers', {
      params: {
        searchTerm: this.searchTerm
      }
    }).subscribe(response => {
      this.offers = response.offers;
      this.searchedTotalOffersCount = response.totalCount;
    });
  }

  getAllOffers() {
    this.http.get<any>('http://localhost:5000/api/Offer/ListOffers').subscribe(response => {
      this.allOffers = response.offers;
      this.totalOffersCount = response.totalCount;
    });
  }
}
