import { NextResponse } from 'next/server';
import { appointments } from '../data';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export async function DELETE(request, { params }) {
  try {
    await delay(1000); // Simulando rede lenta (1 segundo)
    const { id } = await params;
    const numericId = parseInt(id);
    const index = appointments.findIndex(a => a.id === numericId);
    if (index !== -1) {
      appointments.splice(index, 1);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
