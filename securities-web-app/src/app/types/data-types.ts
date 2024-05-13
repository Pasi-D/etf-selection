type StrapiRelationalType<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

interface StrapiCommonAttributes {
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

interface AssetClass {
  Name: string;
  Code: string;
}

interface Ticker {
  DisplayName: string;
  Symbol: string;
}

interface StrapiAssetClassData extends AssetClass, StrapiCommonAttributes {}

interface StrapiTickerData extends Ticker, StrapiCommonAttributes {}

export interface Security {
  Name: string;
  Ticker: StrapiRelationalType<StrapiTickerData>;
  AssetClass: StrapiRelationalType<StrapiAssetClassData>;
  InceptionYear: Date;
  ExpenseRatio: number;
}

interface StrapiSecurityData extends Security, StrapiCommonAttributes {}

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
