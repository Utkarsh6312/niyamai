const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetcher<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.statusText}`);
  }
  return res.json();
}

export const api = {
  obligations: (params?: { limit?: number }): Promise<any[]> => {
    const query = params?.limit ? `?limit=${params.limit}` : '';
    return fetcher(`/obligations${query}`);
  },
  regulations: (params?: { limit?: number }): Promise<any[]> => {
    const query = params?.limit ? `?limit=${params.limit}` : '';
    return fetcher(`/regulations${query}`);
  },
  uploadRegulation: (formData: FormData): Promise<any> => {
    return fetch(`${BASE_URL}/regulations/upload`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  },
  ingestJob: (jobId: string): Promise<any> => {
    return fetcher(`/ingestion/job/${jobId}`);
  },
  obligation: (id: string): Promise<any> => {
    return fetcher(`/obligations/${id}`);
  },
  obligationMappings: (id: string): Promise<any[]> => {
    return fetcher(`/mappings/obligation/${id}`);
  },
  reviewMapping: (id: string, status: string): Promise<any> => {
    return fetcher(`/mappings/${id}/review`, {
      method: 'POST',
      body: JSON.stringify({ status }),
    });
  },
  regulationClauses: (id: string): Promise<any[]> => {
    return fetcher(`/regulations/${id}/clauses`);
  },
  obligationTrace: (id: string): Promise<any> => {
    return fetcher(`/provenance/obligation/${id}`);
  },
  risks: (): Promise<any[]> => {
    return fetcher(`/risks`);
  },
  updateAction: (id: string, data: Record<string, unknown>): Promise<unknown> => {
    return fetcher(`/actions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
};

