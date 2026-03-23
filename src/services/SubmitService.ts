import axios from "axios";

export class SubmitService {
  async send(stats: any, token: string) {
    const res = await axios.post(
      "https://mynxlubykylncinttggu.functions.supabase.co/ibge-submit",
      { stats },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  }
}
