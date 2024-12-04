/* eslint-disable @typescript-eslint/no-explicit-any */

import { FilterQuery, Query } from 'mongoose';

// interface IQueryOption {
//   page: number;
//   limit: number;
//   searchQuery?: string;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
//   fields?: string[]; // Fields to project in the result
//   filters?: Record<string, any>; // Dynamic filters (e.g., { status: 'active' })
// }

class QueryBuilder<T> {
  public queryOption: Record<string, unknown>;
  public modelQuery: Query<T[], T>; // Mongoose Query that returns an array of T
  public nextPage: number;
  public prevPage: number | null;
  public hasNextPage: boolean;
  public totalPage: number;
  constructor(
    modelQuery: Query<T[], T>,
    queryOption: Record<string, unknown>,
    totalItems: number,
  ) {
    this.modelQuery = modelQuery;

    this.queryOption = queryOption;
    this.totalPage = Math.ceil(
      totalItems / Number(this.queryOption.limit || 10),
    );
    this.nextPage = Number(queryOption.page) + 1;
    this.prevPage =
      Number(queryOption.page) > 1 ? Number(this.queryOption.page) - 1 : null;
    this.hasNextPage = Number(queryOption.page) < this.totalPage;
  }
  paginate() {
    const page = Number(this.queryOption.page) || 1;
    const limit = Number(this.queryOption.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.find().limit(limit).skip(skip);
    return this;
  }
  search(searchFields: string[]) {
    const searchTerm = this.queryOption.search;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
}

export default QueryBuilder;
