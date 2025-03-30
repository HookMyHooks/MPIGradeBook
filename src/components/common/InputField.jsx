const InputField = ({ label, value, onChange, type = 'text' }) => (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} type={type} required />
    </div>
  );
  
  export default InputField;
  