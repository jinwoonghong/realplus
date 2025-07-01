import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  if (!query) {
    return NextResponse.json({ error: '검색어가 필요합니다.' }, { status: 400 });
  }

  // 식약처 OpenAPI 엔드포인트 (예시)
  const apiKey = process.env.FOOD_SAFETY_API_KEY; // .env.local에 저장
  const apiUrl = `https://openapi.foodsafetykorea.go.kr/api/${apiKey}/I0030/json/1/10/PRDLST_NM=${encodeURIComponent(query)}`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return NextResponse.json(data);
} 