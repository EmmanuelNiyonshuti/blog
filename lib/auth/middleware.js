import prisma from '../prisma.js';
import { verifyToken } from './jwt.js';

export async function authenticate(request) {
  try {
    const token = request.cookies.get('token')?.value || 
                  request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return { success: false, message: 'Authentication required' };
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return { success: false, message: 'Invalid token' };
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true }
    });

    if (!user) {
      return { success: false, message: 'Invalid token - user not found' };
    }

    return { success: true, user };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return { success: false, message: 'Invalid token' };
    }
    if (error.name === 'TokenExpiredError') {
      return { success: false, message: 'Token expired' };
    }
    return { success: false, message: 'Authentication failed' };
  }
}