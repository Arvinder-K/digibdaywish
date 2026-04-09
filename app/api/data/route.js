import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// Helper to reliably parse or init data
function getStoredData() {
  if (!fs.existsSync(dataFilePath)) {
    return { feedback: [], messages: [], visits: 0 };
  }
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    // Return empty if corrupted or missing
    return { feedback: [], messages: [], visits: 0 };
  }
}

function saveStoredData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = getStoredData();
  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const data = getStoredData();
    const { action, payload } = body;
    let newEntry = null;

    switch(action) {
      case 'record_visit':
        data.visits += 1;
        break;
      case 'save_feedback':
        newEntry = {
          id: Date.now().toString(),
          name: payload.name || 'Anonymous',
          message: payload.message,
          rating: payload.rating,
          status: 'pending',
          timestamp: new Date().toISOString()
        };
        data.feedback.push(newEntry);
        break;
      case 'update_feedback_status':
        const fIndex = data.feedback.findIndex(f => f.id === payload.id);
        if (fIndex !== -1) data.feedback[fIndex].status = payload.status;
        break;
      case 'delete_feedback':
        data.feedback = data.feedback.filter(f => f.id !== payload.id);
        break;
      case 'save_contact_message':
        newEntry = {
          id: Date.now().toString(),
          name: payload.name || 'Anonymous',
          email: payload.email,
          message: payload.message,
          timestamp: new Date().toISOString()
        };
        data.messages.push(newEntry);
        break;
      case 'delete_contact_message':
        data.messages = data.messages.filter(m => m.id !== payload.id);
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    saveStoredData(data);
    return NextResponse.json({ success: true, data, newEntry });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
