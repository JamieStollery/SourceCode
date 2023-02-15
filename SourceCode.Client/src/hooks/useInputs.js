import { useState } from 'react';

export default function useInputs(initial) {
  const [inputs, setInputs] = useState(initial);

  const updateInputs = (event) => setInputs((inputs) => ({ ...inputs, [event.target.name]: event.target.value }));

  return [inputs, updateInputs];
}
