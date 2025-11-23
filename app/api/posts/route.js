import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://blog-backend-2u9m.onrender.com/api';

// POST - Create new post
export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const data = await request.json();
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(error, { status: response.status });
        }
        const newPost = (await response.json()).data;
        return NextResponse.json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
