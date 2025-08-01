import { useRef, useState, useEffect } from "react";
import {
  FaUndo,
  FaRedo,
  FaBold,
  FaUnderline,
  FaItalic,
  FaDownload,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaPlus,
  FaMinus,
  FaListUl,
  FaListOl,
  FaSave,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

interface NoteCard {
  id: string;
  title: string;
  content: string;
}

const NotesEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [savedNotes, setSavedNotes] = useState<NoteCard[]>([]);
  const [title, setTitle] = useState("Untitled Note");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rich-note");
    if (editorRef.current && saved) {
      editorRef.current.innerHTML = saved;
    }
    const savedCards = localStorage.getItem("note-cards");
    if (savedCards) setSavedNotes(JSON.parse(savedCards));
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.fontSize = `${fontSize}px`;
      editorRef.current.style.zoom = `${zoom}`;
    }
  }, [fontSize, zoom]);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    localStorage.setItem("rich-note", editorRef.current?.innerHTML || "");
  };

  const downloadNote = () => {
    const content = editorRef.current?.innerHTML || "";
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "note"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveNoteAsCard = () => {
    const content = editorRef.current?.innerHTML.trim();
    if (!content) return;

    if (editingNoteId) {
      const updatedNotes = savedNotes.map((note) =>
        note.id === editingNoteId ? { ...note, content, title } : note
      );
      setSavedNotes(updatedNotes);
      localStorage.setItem("note-cards", JSON.stringify(updatedNotes));
      setEditingNoteId(null);
    } else {
      const newNote: NoteCard = {
        id: Date.now().toString(),
        title,
        content,
      };
      const updated = [...savedNotes, newNote];
      setSavedNotes(updated);
      localStorage.setItem("note-cards", JSON.stringify(updated));
    }

    if (editorRef.current) editorRef.current.innerHTML = "";
    localStorage.setItem("rich-note", "");
    setTitle("Untitled Note");
  };

  const handleDelete = (id: string) => {
    const filtered = savedNotes.filter((note) => note.id !== id);
    setSavedNotes(filtered);
    localStorage.setItem("note-cards", JSON.stringify(filtered));
  };

  const handleEdit = (note: NoteCard) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = note.content;
      setTitle(note.title);
      setEditingNoteId(note.id);
    }
  };

  return (
    <div className="text-sm text-gray-800 dark:text-gray-200">
      <h3 className="font-semibold mb-3">Your Notes</h3>
      <input
        aria-label="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        className="w-full mb-2 p-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-dark"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center mb-3">
        <button onClick={() => exec("undo")} aria-label="Undo"><FaUndo /></button>
        <button onClick={() => exec("redo")} aria-label="Redo"><FaRedo /></button>
        <button onClick={() => exec("bold")} aria-label="Bold"><FaBold /></button>
        <button onClick={() => exec("underline")} aria-label="Underline"><FaUnderline /></button>
        <button onClick={() => exec("italic")} aria-label="Italic"><FaItalic /></button>
        <button onClick={() => exec("insertUnorderedList")} aria-label="Bullet List"><FaListUl /></button>
        <button onClick={() => exec("insertOrderedList")} aria-label="Numbered List"><FaListOl /></button>
        <select
          onChange={(e) => exec("fontName", e.target.value)}
          className="border rounded px-1 text-sm"
          defaultValue="Arial"
          aria-label="Select Font"
        >
          {["Arial", "Courier New", "Georgia", "Times New Roman", "Verdana"].map((font) => (
            <option key={font} className="dark:bg-primary dark:text-dime" value={font}>{font}</option>
          ))}
        </select>
        <input
          type="color"
          onChange={(e) => exec("foreColor", e.target.value)}
          aria-label="Text Color"
        />
        <button onClick={() => exec("justifyLeft")} aria-label="Align Left"><FaAlignLeft /></button>
        <button onClick={() => exec("justifyCenter")} aria-label="Align Center"><FaAlignCenter /></button>
        <button onClick={() => exec("justifyRight")} aria-label="Align Right"><FaAlignRight /></button>
        <div className="flex items-center gap-1">
          <button onClick={() => setFontSize((s) => Math.max(10, s - 2))} aria-label="Decrease Font Size"><FaMinus /></button>
          <span className="px-1">{fontSize}px</span>
          <button onClick={() => setFontSize((s) => Math.min(72, s + 2))} aria-label="Increase Font Size"><FaPlus /></button>
        </div>
        <button onClick={downloadNote} aria-label="Download Notes" className="text-accent"><FaDownload /></button>
        <button onClick={saveNoteAsCard} aria-label="Save Note Card" className="text-green-600"><FaSave /></button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        aria-label="Notes Editor"
        onInput={() =>
          localStorage.setItem("rich-note", editorRef.current?.innerHTML || "")
        }
        className="min-h-[300px] border border-gray-300 p-3 rounded-lg bg-white dark:bg-dark dark:text-white focus:outline-none overflow-y-auto"
      />

      {/* Zoom Controls */}
      <div className="mt-2 flex gap-2 items-center">
        <span>Zoom:</span>
        <button aria-label="Zoom Out" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}><FaMinus /></button>
        <span>{(zoom * 100).toFixed(0)}%</span>
        <button aria-label="Zoom In" onClick={() => setZoom((z) => Math.min(3, z + 0.1))}><FaPlus /></button>
      </div>

      {/* Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Saved Notes</h4>
          <div className="space-y-3">
            {savedNotes.map((note) => (
              <div key={note.id} className="border border-gray-300 dark:border-gray-700 rounded p-3 bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center mb-1">
                  <h5 className="font-semibold text-sm">{note.title}</h5>
                  <div className="flex gap-2 text-xs">
                    <button onClick={() => handleEdit(note)} aria-label="Edit Note" className="text-blue-500"><FaEdit /></button>
                    <button onClick={() => handleDelete(note.id)} aria-label="Delete Note" className="text-red-600"><FaTrashAlt /></button>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesEditor;
