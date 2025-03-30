import './StudentAverage.css'; 

const StudentAverage = ({ grades = [] }) => {

  if (!grades || grades.length === 0) {
    return (
      <div className="student-average no-grades">
        <h3>No grades available</h3>
        <p>You don't have any grades recorded yet.</p>
      </div>
    );
  }

  const validGrades = grades.filter(grade => 
    grade?.value !== undefined && 
    grade?.value !== null &&
    !isNaN(grade.value)
  );

  if (validGrades.length === 0) {
    return (
      <div className="student-average invalid-grades">
        <h3>No valid grades found</h3>
        <p>All grades appear to be invalid.</p>
      </div>
    );
  }

  const average = validGrades.reduce((sum, grade) => {
    return sum + (grade?.value || 0);
  }, 0) / validGrades.length;

  // 3. Get subject names safely
  const subjects = validGrades.map(grade => 
    grade?.subject?.name || 'Unnamed Subject'
  ).filter(Boolean);

  return (
    <div className="student-average">
      <h3>Academic Summary</h3>
      
      <div className="average-display">
        <span className="average-value">{average.toFixed(2)}</span>
        <span className="average-label">Overall Average</span>
      </div>

      <div className="grade-stats">
        <p>
          <strong>Total Grades:</strong> {validGrades.length}
        </p>
        <p>
          <strong>Subjects:</strong> {[...new Set(subjects)].join(', ')}
        </p>
      </div>
    </div>
  );
};

export default StudentAverage;