import { api } from "./api";
import type { Report } from "@/types";

export const reportService = {
  async getById(candidateId: string): Promise<Report> {
    const response = await api.get(`/report/${candidateId}`);

    return response.data.report;
  },
};