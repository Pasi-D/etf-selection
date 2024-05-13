import { StrapiResponse } from "@/app/types/data-types";

export const GET = async (request: Request) => {
  const host = process.env.STRAPI_HOST;
  const token = process.env.STRAPI_API_KEY;
  const res = await fetch(`${host}/api/etfs?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 10,
    }
  });

  const { data } = (await res.json()) as StrapiResponse;

  const etfs = data.map(({ attributes: { createdAt, publishedAt, updatedAt, ...rest } }) => {
    return {
      ...rest,
    };
  });

  return Response.json(etfs);
};
