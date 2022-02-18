import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname == '/onboarding/redirect') {
    return NextResponse.redirect(
      '/people/0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3'
    );
  }
  return NextResponse.next();
}
