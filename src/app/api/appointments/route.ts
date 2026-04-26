import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const appointments = await db
            .collection('Appointments')
            .find({})
            .toArray();

        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch appointments' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const appointment = await request.json();
        const { db } = await connectToDatabase();
        const result = await db.collection('Appointments').insertOne(appointment);

        return NextResponse.json(
            { ...appointment, id: result.insertedId.toString() },
            { status: 201 }
        );
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json(
            { error: 'Failed to create appointment' },
            { status: 500 }
        );
    }
}
