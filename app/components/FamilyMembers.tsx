'use client';

import Image from 'next/image';
import familyData from '../data/family-members.json';

interface FamilyMember {
  id: number;
  name: string;
  image: string;
  label: string;
}

export default function FamilyMembers() {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Family Members</h2>
      <div className="flex justify-center items-center gap-8">
        {familyData.members.map((member: FamilyMember) => (
          <div key={member.id} className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 128px) 100vw, 128px"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg">{member.name}</p>
              <p className="text-gray-600">{member.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 