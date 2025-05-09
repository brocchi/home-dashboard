import { google } from 'googleapis';
import { NextResponse } from 'next/server';

interface KeepNote {
  id: string;
  title?: string;
  textContent?: string;
  listContent?: {
    items: Array<{
      text: string;
      isChecked: boolean;
    }>;
  };
  labels?: Array<{
    name?: string;
  }>;
}

const keep = google.keep('v1');

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/keep.readonly'],
    });

    const authClient = await auth.getClient();
    google.options({ auth: authClient });

    // Buscar todas as notas
    const response = await keep.notes.list({
      filter: 'trashed=false',
    });

    // Filtrar apenas notas com a label "Shopping" ou que contenham "shopping" no título
    const shoppingNotes = response.data.notes?.filter((note: KeepNote) => 
      note.title?.toLowerCase().includes('shopping') ||
      note.labels?.some((label) => label.name?.toLowerCase() === 'shopping')
    ) || [];

    return NextResponse.json({ notes: shoppingNotes });
  } catch (error) {
    console.error('Error fetching Keep notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Keep notes' },
      { status: 500 }
    );
  }
} 