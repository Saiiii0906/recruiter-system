import { api } from "./api";

export const candidateService = {
  async getAll() {
    const { data } = await api.get("/candidates");
    return data.candidates;
  },

  async getById(id: string) {
    const { data } = await api.get(`/candidate/${id}`);
    return data.candidate;
  },
};