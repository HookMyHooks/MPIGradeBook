const GradeItem = ({ grade }) => {
    return (
      <div className="grade-item">
        <strong>{grade.subject.name}</strong>: {grade.value} (Teacher: {grade.teacher.name}) on {new Date(grade.date).toLocaleDateString()}
      </div>
    );
  };
  
  export default GradeItem;
  