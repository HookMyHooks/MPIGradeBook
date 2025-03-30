import GradeItem from './GradeItem';

const GradeList = ({ grades }) => {
  return (
    <div>
      <h3>Grades</h3>
      {grades.length === 0 ? (
        <p>No grades available.</p>
      ) : (
        grades.map((grade) => (
          <GradeItem key={grade.gradeID} grade={grade} />
        ))
      )}
    </div>
  );
};

export default GradeList;
