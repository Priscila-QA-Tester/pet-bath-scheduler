import { NextResponse } from 'next/server';
import { appointments } from './data';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validação de campos obrigatórios (Fix para o BUG-001)
    const requiredFields = ['owner', 'phone', 'pet', 'breed', 'weight', 'date', 'time', 'service'];
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        return NextResponse.json(
          { error: `The field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    const newAppointment = {
      id: Date.now(),
      ...data,
    };
    appointments.push(newAppointment);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
