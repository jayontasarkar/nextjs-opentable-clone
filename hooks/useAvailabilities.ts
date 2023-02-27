import axios from "axios";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/api/restaurants';

type TAvailabile = { 
  time: string; 
  available: boolean
}[] | null;

export default function useAvailabilities() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TAvailabile>(null);

  const fetchAvailabilities = async ({ 
    slug, 
    day, 
    time,
    partySize
  }: { 
    slug: string;  
    day: string; 
    time: string;
    partySize: number;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/${slug}/availability?day=${day}&time=${time}&partySize=${partySize}`
      );
      setData(response.data);
    } catch (error: any) {
      setError(error?.response?.data?.error);
    }
    setLoading(false);
  };

  return {
    data,
    error,
    loading,
    fetchAvailabilities
  }
};