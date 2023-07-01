import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/SupplierService';
import { OfferService } from '../services/OfferService';
import { Offer } from '../models/offer.model';
import { Supplier } from '../models/supplier.model';
import {AllOffersResponse} from "../models/responseModel/all-offers-response.model";
import {PopularSuppliersResponse} from "../models/responseModel/popular-suppliers-response.model";
import {SearchOffersResponse} from "../models/responseModel/search-offers-response.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  protected popularSuppliers: Supplier[] = [];
  protected offers: Offer[] = [];
  protected allOffers: Offer[] = [];

  protected searchTerm: string = '';
  protected searchedTotalOffersCount: number = 0;
  protected totalOffersCount: number = 0;

  constructor(
    private supplierService: SupplierService,
    private offerService: OfferService
  ) {}

  ngOnInit() {
    this.getPopularSuppliers();
    this.getAllOffers();
  }

  getPopularSuppliers() {
    this.supplierService.getPopularSuppliers().subscribe((response: PopularSuppliersResponse) => {
      this.popularSuppliers = response.suppliers;
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

  getAllOffers() {
    this.offerService.getAllOffers().subscribe((response: AllOffersResponse) => {
      this.allOffers = response.offers;
      this.totalOffersCount = response.totalCount;
    });
  }

  searchOffers() {
    this.offerService.searchOffers(this.searchTerm).subscribe((response: SearchOffersResponse) => {
      this.offers = response.offers;
      this.searchedTotalOffersCount = response.totalCount;
    });
  }
}
