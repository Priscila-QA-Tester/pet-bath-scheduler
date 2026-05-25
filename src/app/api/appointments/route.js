import { NextResponse } from 'next/server';
import { appointments } from './data';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function GET() {
  return NextResponse.json(appointments);
}

export async function POST(request) {
  try {
    await delay(2000); // Simulando rede lenta (2 segundos)
    const data = await request.json();
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
