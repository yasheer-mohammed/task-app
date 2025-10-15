import React, { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || "");

  const save = () => {
    if (!title.trim()) return;
    onEdit({ title: title.trim(), description: desc.trim() });
    setEditing(false);
  };

  return (
    <div
      className={`p-3 border rounded flex justify-between items-start ${
        task.completed ? "bg-gray-100 text-gray-500" : ""
      }`}
    >
      <div className="flex gap-3 flex-1 items-start">
        {/* Mark Complete / Completed */}
        <div className="flex flex-col mt-1">
          {!task.completed ? (
            <button
              onClick={onToggle}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Mark Complete
            </button>
          ) : (
            <span className="px-3 py-1 text-green-600 font-semibold text-sm">
              Completed
            </span>
          )}
        </div>

        {/* Task content */}
        <div className="flex-1">
          {editing ? (
            <>
              <input
                className="border p-1 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="border p-1 rounded w-full mt-1"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description (optional)"
              />
            </>
          ) : (
            <>
              <div
                className={`font-medium ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.title}
              </div>
              {task.description && (
                <div className="text-sm text-slate-600">{task.description}</div>
              )}
              <div className="text-xs text-slate-400 mt-1">
                {new Date(task.created_at).toLocaleString()}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 ml-3">
        {editing ? (
          <>
            <button
              onClick={save}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-1 border rounded text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1 bg-yellow-600 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1 bg-rose-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
