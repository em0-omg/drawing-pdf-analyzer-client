import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const splitCount = url.searchParams.get('split_count') || '4';
    
    const formData = await request.formData();
    
    const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080';
    
    const response = await fetch(
      `${apiBaseUrl}/find_symbols?split_count=${splitCount}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}