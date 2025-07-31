import React from "react";

interface UserProfileCardProps {
  avatarUrl: string;
  username: string;
  displayName?: string;
  rank: string;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  avatarUrl,
  username,
  displayName,
  rank,
}) => {
  return (
    <div className="flex flex-col items-center mb-6">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${username} Avatar`}
        className="w-24 h-24 rounded-full border-4 border-secondary dark:border-accent mb-3"
      />

      {/* Username & Display Name */}
      <h2 className="text-lg font-bold text-primary dark:text-light capitalize">{username}</h2>
      {displayName && (
        <h3 className="text-gray-500 dark:text-dime text-sm">{displayName}</h3>
      )}

      {/* Rank */}
        <div className="flex justify-between items-center bg-gray-50 dark:bg-dark rounded-lg p-3 mt-4 w-full max-w-[200px] shadow-sm">
        <span className="text-gray-600 dark:text-dime text-sm">Rank</span>
        <span className="font-bold text-lg text-secondary dark:text-accent">
          {rank}
        </span>
      </div>
    </div>
  );
};

export default UserProfileCard;
