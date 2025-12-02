import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://blog-backend-2u9m.onrender.com/api';

// POST - Reply to a comment
export async function POST(request, {params}) {
    const {id, commentId} = await params;
    
    if (!id || !commentId){
        return NextResponse.json({error: 'Invalid request, missing ids'}, {status: 400});
    }
    
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const data = await request.json();
        
        const response = await fetch(`${API_BASE_URL}/posts/${id}/comments/${commentId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        const resObj = await response.json();
        
        if (!response.ok) {
            return NextResponse.json(
                { error: resObj.message || 'Failed to reply' }, 
                { status: response.status }
            );
        }
        
        // Return the reply data with success flag
        return NextResponse.json({
            success: true,
            reply: resObj.reply
        });
        
    } catch (error) {
        console.error('Error replying to comment:', error);
        return NextResponse.json(
            { error: 'Failed to reply to this comment' }, 
            { status: 500 }
        );
    }
}