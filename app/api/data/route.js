import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data.json');

// Helper to ensure file exists
const initDataFile = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ feedback: [], messages: [], visits: 0 }, null, 2));
    }
};

export async function GET() {
    try {
        initDataFile();
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(rawData);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading data.json:', error);
        return NextResponse.json({ feedback: [], messages: [], visits: 0 }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        initDataFile();
        const updates = await request.json();
        
        // Read current state
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        let currentData = JSON.parse(rawData);
        
        // Merge updates
        currentData = { ...currentData, ...updates };
        
        // Write back
        fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 2));
        
        return NextResponse.json({ success: true, data: currentData });
    } catch (error) {
        console.error('Error writing to data.json:', error);
        return NextResponse.json({ success: false, error: 'Failed to write data' }, { status: 500 });
    }
}
