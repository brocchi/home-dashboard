'use client';

import { useState, useEffect } from 'react';

interface KeepNote {
  id: string;
  title: string;
  textContent: string;
  listContent?: {
    items: Array<{
      text: string;
      isChecked: boolean;
    }>;
  };
}

export default function Shopping() {
  const [notes, setNotes] = useState<KeepNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKeepNotes = async () => {
      try {
        const response = await fetch('/api/keep-notes');
        if (!response.ok) {
          throw new Error('Failed to fetch Keep notes');
        }
        const data = await response.json();
        setNotes(data.notes);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load shopping list');
        setIsLoading(false);
      }
    };

    fetchKeepNotes();
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-pink-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-pink-200 rounded w-full"></div>
          <div className="h-4 bg-pink-200 rounded w-5/6"></div>
          <div className="h-4 bg-pink-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">{error}</div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-pink-800">Shopping List</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white/50 rounded-lg p-4">
            <h3 className="font-medium text-pink-900 mb-2">{note.title}</h3>
            {note.listContent ? (
              <ul className="space-y-2">
                {note.listContent.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      readOnly
                      className="w-4 h-4 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span className={`${item.isChecked ? 'line-through text-pink-400' : 'text-pink-700'}`}>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-pink-700">{note.textContent}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 