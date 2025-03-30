import GradeList from '../grades/GradeList';
import StudentAverage from './StudentAverage';
import './StudentDashboard.css';

const StudentDashboard = ({ student }) => {
  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1 className="welcome-title">Welcome, {student.name}</h1>
        <p className="student-email">{student.email}</p>
      </div>

      <div className="dashboard-grid">
        <div className="grades-section">
          <h2 className="section-title">Your Grades</h2>
          <GradeList grades={student.grades} />
        </div>

        <div className="stats-section">
          <StudentAverage grades={student.grades} />
          <div className="additional-stats">
            <h3 className="stats-title">Performance Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">
                  {student.grades.length}
                </span>
                <span className="stat-label">Total Grades</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">
                  {[...new Set(student.grades.map(g => g.subject?.name))].length}
                </span>
                <span className="stat-label">Subjects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;