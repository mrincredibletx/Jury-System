import React, { useState } from "react";

const RegisterJuror = ({ contract }) => {
  const [jurorAddress, setJurorAddress] = useState("");

  const handleRegister = async () => {
    try {
      const tx = await contract.registerJuror(jurorAddress);
      await tx.wait();
      alert("Juror registered successfully!");
    } catch (err) {
      console.error("Error registering juror:", err);
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div>
      <h3>Register Juror</h3>
      <input
        type="text"
        placeholder="Juror Address"
        value={jurorAddress}
        onChange={(e) => setJurorAddress(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterJuror;
