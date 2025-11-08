export interface Detection {
  class_name: string;
  confidence: number;
  bbox: number[];
  page: number;
  split_index: number;
}

export interface AnalysisResult {
  filename: string;
  image_format: string;
  page_count: number;
  split_count: number;
  total_splits: number;
  images: string[];
  highlighted_images: string[];
  detections: Detection[];
  detection_count: number;
}

export async function uploadPDF(
  file: File,
  splitCount: string,
  conf: string = '0.25'
): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `/api/yolo_analyze_pdf?split_count=${splitCount}&conf=${conf}`,
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