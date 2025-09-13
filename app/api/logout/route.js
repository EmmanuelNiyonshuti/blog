import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    try{
        (await cookies()).delete('token');
        return NextResponse.json({})
    }catch(error){
        return NextResponse.json(
            { success: false, message: 'Frontend logout failed' },
            { status: 500 }
        )
    }
}