import axios from "axios";

export class AuthService {
  async login(email: string, password: string): Promise<string> {
    try {
      const res = await axios.post(
        "https://mynxlubykylncinttggu.supabase.co/auth/v1/token?grant_type=password",
        { email, password },
        {
          headers: {
            apikey: process.env.SUPABASE_KEY!,
          },
        },
      );

      return res.data.access_token;
    } catch (err: any) {
      console.log("ERRO REAL:", err.response?.data);
      throw err;
    }
  }
}
