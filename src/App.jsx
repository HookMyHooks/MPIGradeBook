import { useState } from 'react';
import StudentDashboard from './components/student/StudentDashboard';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import './App.css';

// Test data
const testStudent = {
  studentID: 1,
  name: 'Bianca Nechita',
  email: 'bnechita@example.com',
  grades: [
    {
      gradeID: 1,
      subject: { name: 'Romana' },
      value: 10,
      date: new Date(),
      teacher: { name: 'Bichir Luminita' }
    },
    {
      gradeID: 2,
      subject: { name: 'Matematica' },
      value: 9,
      date: new Date(),
      teacher: { name: 'Alistar Liliana' }
    },
    {
      gradeID: 3,
      subject: { name: 'Istorie' },
      value: 8,
      date: new Date(),
      teacher: { name: 'Chelaru Ludmila' }
    }
  ]
};

function App() {
  const [activeView, setActiveView] = useState('student');
  const [grades, setGrades] = useState(testStudent.grades);

  const handleAddGrade = (newGrade) => {
    const gradeToAdd = {
      ...newGrade,
      gradeID: grades.length + 1,
      date: new Date(),
      teacher: { name: 'Current Teacher' }
    };
    setGrades([...grades, gradeToAdd]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Grade Nexus</h1>
        <nav className="view-switcher">
          <button
            className={`view-button ${activeView === 'student' ? 'active' : ''}`}
            onClick={() => setActiveView('student')}
          >
            <i className="fas fa-user-graduate"></i> Student View
          </button>
          <button
            className={`view-button ${activeView === 'teacher' ? 'active' : ''}`}
            onClick={() => setActiveView('teacher')}
          >
            <i className="fas fa-chalkboard-teacher"></i> Teacher View
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeView === 'student' ? (
          <StudentDashboard student={{ ...testStudent, grades }} />
        ) : (
          <TeacherDashboard grades={grades} onAddGrade={handleAddGrade} />
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Grade Nexus. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;