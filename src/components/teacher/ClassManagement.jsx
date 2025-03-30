const ClassManagement = ({ students, onRemove }) => {
    return (
      <div>
        <h3>Class Management</h3>
        {students.map((s) => (
          <div key={s.studentID}>
            {s.name}
            <button onClick={() => onRemove(s.studentID)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };
  
  export default ClassManagement;
  