// import { match } from '@formatjs/intl-localematcher'
// import Negotiator from 'negotiator'

import { NextRequest, NextResponse } from "next/server";

 
// let headers = { 'accept-language': 'en-US,en;q=0.5' }
// let languages = new Negotiator({ headers }).languages()
// let locales = ['en-US', 'nl-NL', 'nl']
// let defaultLocale = 'en-US'
 
// match(languages, locales, defaultLocale) // -> 'en-US'

export function middleware(request:NextRequest){
    const requestNewHeaders=new Headers(request.headers)
    requestNewHeaders.set('x-url',request.url)
    return NextResponse.next({
        request:{
            headers:requestNewHeaders
        }
    })
}