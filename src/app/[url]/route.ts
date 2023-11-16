import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/app/utils/database'
import {Link} from '@/app/models/link'

export async function GET(req:NextRequest, res:NextResponse) {
  await connectDB()
  let url ='';
  try{
    const link = await Link.findOne({generatedLink: "shadmirza"}).select("longLink")
    url = link?.longLink || ''
  }
  catch(err){
    console.log('error', err);
  }
  return NextResponse.redirect(url)
}