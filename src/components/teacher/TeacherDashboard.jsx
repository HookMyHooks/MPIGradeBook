import { useState } from 'react';
import AddGradeForm from '../grades/AddGradeForm';
import GradeList from '../grades/GradeList';
import './TeacherDashboard.css';

const TeacherDashboard = ({ grades, onAddGrade }) => {
  const [filterSubject, setFilterSubject] = useState('');

  const filteredGrades = filterSubject
    ? grades.filter(grade => 
        grade.subject?.name?.toLowerCase().includes(filterSubject.toLowerCase())
      )
    : grades;

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Teacher Dashboard</h1>
        <div className="controls">
          <input
            type="text"
            placeholder="🔍 Filter by subject..."
            className="filter-input"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="form-section">
          <AddGradeForm onAdd={onAddGrade} />
        </div>
        <div className="grades-section">
          <h2 className="section-title">Grade Records</h2>
          <GradeList grades={filteredGrades} showTeacher={true} />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;