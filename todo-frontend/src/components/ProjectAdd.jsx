

function ProjectAdd({newProjectName, setNewProjectName, handleCreateProject}){

    return(
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    placeholder="New project"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") 
                        handleCreateProject();
                    }}
                    className="border px-2 py-1 rounded text-sm flex-1 min-w-0"
                    />
                <button
                onClick={handleCreateProject}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm shrink-0"
                >
                 Add
                </button>

            </div>
    )
}

export default ProjectAdd;
