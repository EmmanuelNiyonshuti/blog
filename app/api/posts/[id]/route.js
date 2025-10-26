import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const API_BASE_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://blog-backend-2u9m.onrender.com/api';


// get all posts




// get post by id
export async function GET(request, { params }) {
    // The 'params' object contains the dynamic route parameters!
    const { id } = params; // This is your post ID from the URL
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(error, { status: response.status });
        }
        
        const post = await response.json();
        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

// PUT/PATCH - Update post by ID
export async function PUT(request, { params }) {
    // Again, the ID comes from the params object
    const { id } = await params; // This is the [id] from your folder name
    
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const data = await request.json();
        
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'PUT',
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
        const updatedPost = await response.json();
        console.log("updated post:", updatedPost);
        return NextResponse.json(updatedPost.post);
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}
