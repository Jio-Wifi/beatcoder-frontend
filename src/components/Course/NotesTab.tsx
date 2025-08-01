import React from "react";
import NotesEditor from "./NotesEditor"; // Adjust the path if needed

const NotesTab: React.FC = () => {
  return (
    <div className="text-sm text-gray-800 dark:text-gray-200">
      {/* <h3 className="font-semibold mb-2">Your Notes</h3> */}
      <NotesEditor />
    </div>
  );
};

export default NotesTab;
