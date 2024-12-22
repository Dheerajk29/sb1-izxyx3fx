import React from 'react';
import { User } from 'lucide-react';

interface ProfileInfoProps {
  user: {
    name: string;
    email: string;
    phoneNumber?: string;
  };
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {user.phoneNumber && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Phone Number</h3>
          <p>{user.phoneNumber}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;