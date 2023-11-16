import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/app/utils/database'
import {Link} from '@/app/models/link'

export async function GET(req:NextRequest, res:NextResponse) {
  const linkParam = req.nextUrl.pathname.slice(1)
  console.log(req.nextUrl.origin);
  
  await connectDB()
  try{
    const link = await Link.findOne({generatedLink: linkParam}).select("longLink")
    let url = link?.longLink || req.nextUrl.origin
    return NextResponse.redirect(url)
  }
  catch(err){
    console.log('error', err);
    return NextResponse.json({},{status:500})
  }
}