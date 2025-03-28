import { useState } from 'react';

const AddGradeForm = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const [subject, setSubject] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(value);
    if (val < 1 || val > 10) {
      alert("Grade must be between 1 and 10");
      return;
    }
    onAdd({ subject, value: val, date: new Date() });
    setValue('');
    setSubject('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Grade (1-10)"
        required
      />
      <button type="submit">Add Grade</button>
    </form>
  );
};

export default AddGradeForm;
