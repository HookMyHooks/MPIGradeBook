const StudentCard = ({ student }) => {
    return (
      <div className="student-card">
        <h2>{student.name}</h2>
        <p>Email: {student.email}</p>
        <p>ID: {student.studentID}</p>
      </div>
    );
  };
  
  export default StudentCard;
  