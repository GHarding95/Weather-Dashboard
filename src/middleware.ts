import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add a script to initialize localStorage state
  const script = `
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('weatherState');
      if (savedState) {
        window.__NEXT_DATA__.props.pageProps.initialState = JSON.parse(savedState);
      }
    }
  `;
  
  // Add the script to the response
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: '/',
}; 