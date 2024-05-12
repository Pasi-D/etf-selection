export interface Security {
  Name: string;
  Ticker: string;
  AssetClass: string;
  InceptionYear: Date;
  ExpenseRatio: number;
}

interface StrapiSecurityData extends Security {
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface StrapiResponse {
  data: Array<{ id: number; attributes: StrapiSecurityData }>;
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
