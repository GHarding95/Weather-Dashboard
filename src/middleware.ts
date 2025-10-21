import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware() {
  const response = NextResponse.next();
  
  // Add the script to the response
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: '/',
}; 