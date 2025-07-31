import React from "react";

interface User {
  id: string;
  username: string;
}

interface Props {
  users: User[];
}

const ParticipantList: React.FC<Props> = ({ users }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-dime mb-3">Participants</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between bg-gray-50 dark:bg-dark p-2 rounded shadow-sm"
          >
            <span className="text-gray-700 dark:text-dime truncate">{user.username}</span>
            <span className="w-2 h-2 bg-green-500 rounded-full" title="Online"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
