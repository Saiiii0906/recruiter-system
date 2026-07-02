import { api } from "./api";
import type { Analytics } from "@/types";

interface AnalyticsResponse {
  status: string;
  analytics: Analytics;
}

export const analyticsService = {
  async get(): Promise<Analytics> {
    const response = await api.get("/analytics");

    const analytics = response.data.analytics;

    analytics.top_skills =
      analytics.top_skills?.map(([name, count]: [string, number]) => ({
        name,
        count,
      })) ?? [];

    return analytics;
  },
};
