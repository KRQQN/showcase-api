import { useState, useCallback } from "react";

const API_BASE_URL = "/api";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = () => {
  const [state, setState] = useState<ApiResponse<any>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (url: string, options: RequestInit = {}) => {
      setState({ data: null, loading: true, error: null });
      try {
        const res = await fetch(`${API_BASE_URL}${url}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! status: ${res.status}, body: ${errorText}`,
          );
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await res.text();
          throw new Error(`Expected JSON, got: ${errorText}`);
        }

        const data = await res.json();
        setState({ data, loading: false, error: null });
        return data;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [],
  );

  const startGame = useCallback(
    async (wordLength: number) => {
      console.log("useApi: startGame called");
      return request("/wordle/start-game", {
        method: "POST",
        body: JSON.stringify({ wordLength }),
      });
    },
    [request],
  );

  const submitGuess = useCallback(
    async (gameId: string, guess: string) => {
      console.log("useApi: submitGuess called", { gameId, guess });
      const result = await request(`/wordle/guess/${gameId}`, {
        method: "POST",
        body: JSON.stringify({ guess }),
      });

      result.feedback = result.feedback.map((status: string, i: number) => ({
        letter: guess[i],
        status:
          status === "present"
            ? "misplaced"
            : (status as "correct" | "incorrect"),
      }));
      return result;
    },
    [request],
  );

  return {
    ...state,
    startGame,
    submitGuess,
  };
};
