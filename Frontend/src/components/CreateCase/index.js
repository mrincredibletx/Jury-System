import React, { useState } from "react";

const CreateCase = ({ contract }) => {
  const [description, setDescription] = useState("");
  const [evidenceURI, setEvidenceURI] = useState("");
  const [category, setCategory] = useState("");
  const [jurors, setJurors] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreate = async () => {
    try {
      const jurorArray = jurors.split(",").map((addr) => addr.trim());
      const tx = await contract.createCase(description, evidenceURI, category, jurorArray, duration);
      await tx.wait();
      alert("Case created successfully!");
    } catch (err) {
      console.error("Error creating case:", err);
      alert("Case creation failed. Check console for details.");
    }
  };

  return (
    <div>
      <h3>Create Case</h3>
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Evidence URI" value={evidenceURI} onChange={(e) => setEvidenceURI(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Jurors (comma-separated)" value={jurors} onChange={(e) => setJurors(e.target.value)} />
      <input type="number" placeholder="Duration in minutes" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <button onClick={handleCreate}>Create Case</button>
    </div>
  );
};

export default CreateCase;
