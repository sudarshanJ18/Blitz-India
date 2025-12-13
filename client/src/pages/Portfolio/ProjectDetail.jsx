import React from "react";
import { useParams } from "react-router-dom";
import { projects } from "../../assets/assets.js";

function ProjectDetail() {
  const { projectId } = useParams();
  const idNum = Number(projectId);
  const project = projects.find((p) => p._id === idNum);

  if (!project) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Project Not Found</h1>
        <p>The requested project does not exist.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-lg text-gray-600 mb-6">{project.shortDescription}</p>
      <img
        src={project.image}
        alt={project.title}
        style={{ width: "100%", borderRadius: 8, margin: "1rem 0" }}
      />
      <h2>Overview</h2>
      <p>{project.description}</p>
      <div style={{ marginTop: "1rem" }}>
        <h3>Project Details</h3>
        <ul>
          <li>Category: {project.category}</li>
          <li>Client: {project.client}</li>
          <li>Date: {project.date}</li>
          <li>Duration: {project.duration}</li>
        </ul>
      </div>
      {project.results?.length ? (
        <div style={{ marginTop: "1rem" }}>
          <h3>Results</h3>
          <ul>
            {project.results.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default ProjectDetail;