'use server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {

    const cookieStore = cookies()

    if (!cookieStore.has('sync-session')) {
        return NextResponse.redirect(new URL('/signin', request.url))
    } else {
        
    }

}

export const config = {
    matcher: [
        "/dashboard",
        "/study-plan",
        "/gpa",
        "/profile"
    ]
};
