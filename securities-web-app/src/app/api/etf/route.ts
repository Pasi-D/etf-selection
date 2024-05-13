import { FilterParams } from "@/app/constants/enums";
import { StrapiResponse } from "@/app/types/data-types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const host = process.env.STRAPI_HOST;
  const token = process.env.STRAPI_API_KEY;

  const assetClassFilterParam = request.nextUrl.searchParams.get(FilterParams.ASSET_CLASS);
  const inceptionYearFilterParam = request.nextUrl.searchParams.get(FilterParams.INCEPTION_YEAR);
  const expenseRatioFilterParam = request.nextUrl.searchParams.get(FilterParams.EXPENSE_RATIO);

  let path = `${host}/api/etfs?populate=*`;

  if (assetClassFilterParam || inceptionYearFilterParam) {
    let filterParams = "";

    if (assetClassFilterParam) {
      filterParams += `filters[AssetClass][Code][$eq]=${assetClassFilterParam}`;
    }

    if (inceptionYearFilterParam) {
      filterParams += `${filterParams ? "&" : ""}filters[InceptionYear][$contains]=${inceptionYearFilterParam}`;
    }

    if (expenseRatioFilterParam) {
      filterParams += `${filterParams ? "&" : ""}filters[ExpenseRatio][$eq]=${expenseRatioFilterParam}`;
    }

    path = `${host}/api/etfs?${filterParams}&populate=*`;
  }

  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 10,
    },
  });

  const { data } = (await res.json()) as StrapiResponse;

  const etfs = data.map(({ attributes: { createdAt, publishedAt, updatedAt, ...rest } }) => {
    return {
      ...rest,
    };
  });

  return Response.json(etfs);
};
