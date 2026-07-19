import { api } from "./api";
import type { Report } from "@/types";

export const reportService = {
  async getAll() {
    const response = await api.get("/reports");
    return response.data.reports;
  },

  async getById(candidateId: string): Promise<Report> {
    const response = await api.get(`/report/${candidateId}`);
    return response.data.report;
  },
};