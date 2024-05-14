import React from 'react';
import { codingEnvironments } from '../utils/codingEnvironments';

function IgnorePatternConfig({ selectedEnvironment, onEnvironmentChange }) {
  const handleChange = (event) => {
    onEnvironmentChange(event.target.value);
  };

  return (
    <div className="ignore-pattern-config">
      <h2>Ignore Patterns</h2>
      <select value={selectedEnvironment} onChange={handleChange}>
        {codingEnvironments.map((env) => (
          <option key={env.id} value={env.id}>
            {env.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default IgnorePatternConfig;