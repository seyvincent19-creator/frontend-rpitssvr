import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SkillPages from "./SkillPages";
import DepartmentSidebar from "./DepartmentSidebar";

const DepartmentPage = () => {
  const { id } = useParams();
  const [departmentData, setDepartmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://phplaravel-1634699-6478817.cloudwaysapps.com/api/departments/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setDepartmentData(data.data);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching department data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartmentData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading department data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Error loading department: {error}
        </div>
      </div>
    );
  }

  if (!departmentData) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Department not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <DepartmentSidebar department={departmentData} />
        </div>
        <div className="col-md-8">
          <SkillPages {...departmentData} />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;