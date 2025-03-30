const GradeHistory = ({ history }) => {
    return (
      <div>
        <h3>Grade History</h3>
        {history.map((grade, i) => (
          <div key={i}>
            {grade.subject.name}: {grade.value} - {new Date(grade.date).toLocaleDateString()}
          </div>
        ))}
      </div>
    );
  };
  
  export default GradeHistory;
  