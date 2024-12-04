import { Query } from 'mongoose';
import QueryBuilder from './QueryBuilder';

class HotelQueryBuilder<T> extends QueryBuilder<T> {
  constructor(
    modelQuery: Query<T[], T>,
    queryOption: Record<string, unknown>,
    totalItems: number,
  ) {
    super(modelQuery, queryOption, totalItems);
  }
  filter() {
    const { minPrice, maxPrice, rating, category, country, city, currency , amenities
    } =
      this.queryOption;

    if (minPrice || maxPrice) {
      this.modelQuery = this.modelQuery.find({
        pricePerNight: {
          ...(minPrice ? { $gte: Number(minPrice) } : {}),
          ...(maxPrice ? { $gte: Number(maxPrice) } : {}),
        },
      });
    }
    if (rating) {
      this.modelQuery = this.modelQuery.find({
        rating: {
          ...(rating
            ? {
                $lte: Number(rating),
              }
            : {}),
        },
      });
    }

    if (category) {
      this.modelQuery = this.modelQuery.find({
        classification: category,
      });
    }
    if (country) {
      this.modelQuery = this.modelQuery.find({
        'location.country': country,
      });
    }
    if (city) {
      this.modelQuery = this.modelQuery.find({
        'location.city': city,
      });
    }
    if (currency) {
      this.modelQuery = this.modelQuery.find({
        currency,
      });
    }
    if(amenities){
        this.modelQuery = this.modelQuery.find({
            amenities : {$in : amenities}
        })
    }
  }
}

export default HotelQueryBuilder;
