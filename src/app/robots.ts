import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/const";

export const dynamic = "force-static";
export const revalidate = 1;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", baseUrl).href,
    host: new URL(baseUrl).host,
  };
}
