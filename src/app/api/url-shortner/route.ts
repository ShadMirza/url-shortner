import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/app/utils/database'
import {Link} from '@/app/models/link'
export async function POST(req:NextRequest, res:NextResponse) {
  const {longLink, miniLink} = await req.json()
  let generatedLink;
  await connectDB()
  try{
    generatedLink=  miniLink ? miniLink : nanoid(10)
    //logic
    try{
      await Link.create({longLink, generatedLink})
    }
    catch(error:any){
      if (error.code === 11000 || error.code === 11001) {
        return NextResponse.json({linkExists: true}, {status: 200})
      } else {
        console.error('Error:', error);
      }
    }
    console.log(generatedLink);
    return NextResponse.json({generatedLink:`https://${process.env.NEXT_PUBLIC_DOMAIN}/${generatedLink}`}, {status: 200})
  }
  catch(err){
    console.error('Error in post request', err);
    return NextResponse.json({message: "Server Error"}, {status: 500})
  }
}