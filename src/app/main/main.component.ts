import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../services/SupplierService";
import {OfferService} from "../services/OfferService";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  popularSuppliers: any[] = [];
  searchTerm: string = '';
  offers: any[] = [];
  searchedTotalOffersCount: number = 0;
  totalOffersCount: number = 0;
  allOffers: any[] = [];

  constructor(
    private supplierService: SupplierService,
    private offerService: OfferService
  ) {}

  ngOnInit() {
    this.getPopularSuppliers();
    this.getAllOffers();
  }

  getPopularSuppliers() {
    this.supplierService.getPopularSuppliers().subscribe(response => {
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
    this.offerService.searchOffers(this.searchTerm).subscribe(response => {
      this.offers = response.offers;
      this.searchedTotalOffersCount = response.totalCount;
    });
  }

  getAllOffers() {
    this.offerService.getAllOffers().subscribe(response => {
      this.allOffers = response.offers;
      this.totalOffersCount = response.totalCount;
    });
  }
}
