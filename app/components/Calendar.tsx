'use client';

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load the Google Calendar API script
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', initClient);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initClient = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!apiKey || !clientId) {
        throw new Error('Missing Google API credentials');
      }

      await window.gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly'
      });

      // Listen for sign-in state changes
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // Handle the initial sign-in state
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      setError('Failed to initialize Google Calendar');
      setIsLoading(false);
    }
  };

  const updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      setIsLoading(false);
    } else {
      // Sign in the user
      window.gapi.auth2.getAuthInstance().signIn();
    }
  };

  if (isLoading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">{error}</div>
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  if (!apiKey) {
    return <div className="text-red-600">Missing Google API Key</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-purple-800">Calendar</h2>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          googleCalendarApiKey={apiKey}
          events={{
            googleCalendarId: 'primary'
          }}
          height="auto"
          eventClick={(info) => {
            window.open(info.event.url, '_blank');
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          themeSystem="standard"
          dayMaxEvents={3}
          moreLinkContent={(args) => `+${args.num} more`}
        />
      </div>
    </div>
  );
} 