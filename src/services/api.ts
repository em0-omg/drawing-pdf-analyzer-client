export interface AnalysisResult {
  filename: string;
  page_count: number;
  image_format: string;
  images?: string[];
  highlighted_images?: string[];
  analysis?: any;
  symbol_count?: number;
  total_matches?: number;
  matches_by_symbol?: any;
}

export async function uploadPDF(
  file: File,
  apiEndpoint: string,
  splitCount: string
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `/api/${apiEndpoint}?split_count=${splitCount}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}