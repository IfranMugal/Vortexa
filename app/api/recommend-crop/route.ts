import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { forecastData } = await request.json();

  // IMPORTANT: Add your Gemini API Key to your .env.local file
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `Based on this 3-month weather forecast for a farm in Maharashtra, India, suggest the single most suitable and profitable crop to sow. Provide only the crop name and nothing else. Forecast: ${JSON.stringify(forecastData)}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API failed with status: ${response.status}`);
    }

    const data = await response.json();
    const cropName = data.candidates[0]?.content?.parts[0]?.text.trim() || "Soybean";
    
    return NextResponse.json({ recommendation: cropName });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}