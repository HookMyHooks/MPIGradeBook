const GradeUploadBulk = ({ onUpload }) => {
    const handleUpload = (e) => {
      const file = e.target.files[0];
    };
  
    return (
      <div>
        <label>Bulk Upload Grades:</label>
        <input type="file" accept=".csv,.json" onChange={handleUpload} />
      </div>
    );
  };
  
  export default GradeUploadBulk;
  