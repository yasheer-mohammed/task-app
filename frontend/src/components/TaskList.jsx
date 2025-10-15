<ul className="space-y-2">
  {tasks.map((task) => (
    <li key={task.id} className="flex justify-between items-center border p-2">
      <div className="flex-1">
        {editingTaskId === task.id ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border p-1 flex-1"
            />
            <button
              className="bg-green-500 text-white px-2"
              onClick={() => saveEdit(task.id)}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-2"
              onClick={() => setEditingTaskId(null)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>
            {!task.completed && (
              <button
                onClick={() => toggleComplete(task)}
                className="bg-green-500 text-white px-2 rounded"
              >
                Mark Complete
              </button>
            )}
            {task.completed && (
              <span className="text-green-600 font-semibold px-2">
                Completed
              </span>
            )}
          </div>
        )}
      </div>

      {editingTaskId !== task.id && (
        <div className="flex gap-2">
          <button
            className="text-blue-500"
            onClick={() => {
              setEditingTaskId(task.id);
              setEditTitle(task.title);
            }}
          >
            Edit
          </button>
          <button className="text-red-500" onClick={() => deleteTask(task)}>
            Delete
          </button>
        </div>
      )}
    </li>
  ))}
</ul>;
