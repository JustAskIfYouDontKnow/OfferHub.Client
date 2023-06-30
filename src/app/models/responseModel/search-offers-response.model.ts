import {Offer} from "../offer.model";

export interface SearchOffersResponse {
  offers: Offer[];
  totalCount: number;
}
