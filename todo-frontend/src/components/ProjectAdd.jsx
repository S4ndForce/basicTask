

function ProjectAdd({newProjectName, setNewProjectName, handleCreateProject}){

    return(
            <div className = "flex gap-2 mb-3">
                <input
                type="text"
                placeholder="New project"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="border px-2 py-1 rounded"
                />
                <button
                onClick={handleCreateProject}
                className="bg-blue-500 text-white px-3 rounded"
                >
                Add
            </button>

            </div>
    )
}

export default ProjectAdd;
