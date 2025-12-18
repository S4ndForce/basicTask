

function Projects({ projects, selectedProjectId, setSelectedProjectId }) {
     console.log("Projects component rendered", projects);
  return (
    
    <div className="flex gap-2 mb-4">
      {projects.map(project => (
        <button
          key={project.id}
          onClick={() => setSelectedProjectId(project.id)}
          className={
            project.id === selectedProjectId
              ? "font-bold underline"
              : ""
          }
        >
          {project.name}
        </button>
      ))}
      {projects.length === 0 && (
        <p className="text-sm text-gray-500">No projects yet</p>
    )}
    </div>
  );
}
export default Projects;

/*
function Projects({ projects }) {
  return (
    <div
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "16px",
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 9999
      }}
    >
      PROJECTS TEST — {projects.length}
    </div>
  );
}
export default Projects;
*/