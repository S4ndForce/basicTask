function Projects({ projects, selectedProjectId, setSelectedProjectId, handleDeleteProject }) {
  return (
    <>
      {projects.map(project => {
        const isActive = project.id === selectedProjectId;

        return (
          <div
  key={project.id}
  onClick={() =>
    setSelectedProjectId(isActive ? null : project.id)
  }
  className={`group flex items-center justify-between px-3 py-2 rounded cursor-pointer
    ${isActive
      ? "bg-blue-100 text-blue-700 font-medium"
      : "hover:bg-gray-100 text-gray-700"}
  `}
>
  <span className="truncate text-sm">
    {project.name}
  </span>

  <button
    onClick={(e) => {
       e.stopPropagation();
    handleDeleteProject(project.id);
    }}
    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs"
    title="Delete project"
  >
    x
  </button>
</div>

        );
      })}

      {projects.length === 0 && (
        <p className="text-sm text-gray-400 mt-2">
          No projects yet
        </p>
      )}
    </>
  );
}

export default Projects;
