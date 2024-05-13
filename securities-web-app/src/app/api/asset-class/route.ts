import { StrapiResponse } from "@/app/types/data-types";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const host = process.env.STRAPI_HOST;
  const token = process.env.STRAPI_API_KEY;

  const path = `${host}/api/asset-classes`;
  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 10,
    },
  });

  const { data } = (await res.json()) as StrapiResponse;

  const assetClasses = data.map(
    ({ attributes: { createdAt, publishedAt, updatedAt, ...rest } }) => {
      return {
        ...rest,
      };
    },
  );

  return Response.json(assetClasses);
};
