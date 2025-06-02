import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import SubscriberModel from '../../../models/subscriber';

export async function GET(req: NextRequest) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.redirect(new URL('/verification-error', req.url)); // Redirect on missing token
    }

    try {
        const subscriber = await SubscriberModel.findOne({ verificationToken: token });

        if (!subscriber) {
            return NextResponse.redirect(new URL('/verification-error', req.url));
        }

        const redirectWithEmail = (path: string) => {
            const url = new URL(path, req.url);
            url.searchParams.set('email', subscriber.email);
            return NextResponse.redirect(url);
        };

        if (subscriber.verificationTokenExpiry && subscriber.verificationTokenExpiry < new Date()) {
            return redirectWithEmail('/verification-expired');
        }

        if (subscriber.isVerified) {
            return redirectWithEmail('/already-verified');
        }

        subscriber.isVerified = true;
        subscriber.verificationToken = undefined;
        subscriber.verificationTokenExpiry = undefined;
        await subscriber.save();

        return redirectWithEmail('/verified');

    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.redirect(new URL('/verification-error', req.url));
    }
}
