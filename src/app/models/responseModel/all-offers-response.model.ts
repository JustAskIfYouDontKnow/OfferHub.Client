import {Offer} from "../offer.model";

export interface AllOffersResponse {
  offers: Offer[];
  totalCount: number;
}
