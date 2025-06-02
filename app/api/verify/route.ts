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

        if (subscriber.verificationTokenExpiry && subscriber.verificationTokenExpiry < new Date()) {
            return NextResponse.redirect(new URL('/verification-expired', req.url));
        }

        if (subscriber.isVerified) {
            return NextResponse.redirect(new URL('/already-verified', req.url));
        }

        subscriber.isVerified = true;
        subscriber.verificationToken = undefined;
        subscriber.verificationTokenExpiry = undefined;
        await subscriber.save();

        return NextResponse.redirect(new URL('/verified', req.url));

    } catch (error) {
        console.error('Verification Error:', error);
        return NextResponse.redirect(new URL('/verification-error', req.url));
    }
}
