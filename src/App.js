// React import for using React and hooks
import React from 'react';

// Firebase imports for authentication
import { auth } from './firebaseConfig'; // Adjust the path as necessary

// Material-UI component imports
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from '@mui/material';

import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import DataSubmissionForm from './FormPage';
import SettingsPage from './SettingsPage';
import NavBar from './NavBar';
import EditForm from './EditForm';
import AddForm from './AddForm';
import { columns } from './columns';

// Material-UI icon imports
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

// Data Service for Firebase operations
import { getSubmissions, deleteSubmission, saveSubmissionEdit, addNewSubmission } from './dataService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      navbarColor: 'default',
      editingId: null,
      isAuthenticated: false,
      user: null,
    };
  }

  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(user => {
      this.setState({ isAuthenticated: !!user, user }, () => {
        if (user) {
          // Only fetch data after confirming user is authenticated
          this.reloadSubmissionList();
          this.loadSettings();
        }
      });
    });
  }
  
  loadSettings = () => {
    const storedNavBarColor = localStorage.getItem('navbarColor');
    if (storedNavBarColor) {
      this.setState({ navbarColor: storedNavBarColor });
    }
  };

  componentWillUnmount() {
    if (this.unregisterAuthObserver) {
      this.unregisterAuthObserver();
    }
  }

  reloadSubmissionList = () => {
    getSubmissions(submissionsList => {
      this.setState({ submissions: submissionsList });
    });
  };

  handleDeleteSubmission = (submissionId) => {
    deleteSubmission(submissionId, this.reloadSubmissionList);
  };

  startEdit = (submissionId) => {
    this.setState({ editingId: submissionId });
  };

  handleSaveEdit = (editedSubmission) => {
    saveSubmissionEdit(this.state.editingId, editedSubmission, () => {
      this.setState({ editingId: null });
      this.reloadSubmissionList();
    });
  };

  cancelEdit = () => {
    this.setState({ editingId: null });
  };

  handleAddSubmission = (newSubmission) => {
    addNewSubmission(newSubmission, this.reloadSubmissionList);
  };

  handleLogout = async () => {
    try {
      await auth.signOut();
      this.setState({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  changeNavBarColor = (newColor) => {
    this.setState({ navbarColor: newColor });
    localStorage.setItem('navbarColor', newColor);
  };

  render() {
    const { isAuthenticated, user, submissions, editingId } = this.state;
    return (
      <Router>
        <NavBar user={user} onLogout={this.handleLogout} color={this.state.navbarColor} />
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate replace to="/" /> : <LoginPage />} />
          <Route path="/form" element={<DataSubmissionForm />} />
          <Route path="/settings" element={<SettingsPage currentColor={this.state.navbarColor} changeNavBarColor={this.changeNavBarColor} />} />
          <Route path="/" element={isAuthenticated ? (
            <div>
              <Typography variant="h4" style={{ display: 'flex', justifyContent: 'center' }}>
                Form Submissions
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>ID</TableCell>
                    {columns.map((column) => (
                      <TableCell style={{ fontWeight: 'bold' }} key={column.id}>{column.label}</TableCell>
                    ))}
                    <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions.map((row) => (
                    editingId === row.id ?
                      <EditForm key={row.id} submission={row} saveEdit={this.handleSaveEdit} cancelEdit={this.cancelEdit} /> :
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        {columns.map((column) => (
                          <TableCell 
                            style={{ 
                              maxWidth: '200px', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis', 
                              whiteSpace: 'nowrap' 
                            }} 
                            key={column.id}
                          >
                            {row[column.id]}
                          </TableCell>
                        ))}
                        <TableCell>
                          <Button onClick={() => this.startEdit(row.id)}><CreateIcon /></Button>
                          <Button onClick={() => this.handleDeleteSubmission(row.id)}><DeleteIcon /></Button>
                        </TableCell>
                      </TableRow>
                  ))}
                  <AddForm addSubmission={this.handleAddSubmission} />
                </TableBody>
              </Table>
            </div>
          ) : <Navigate replace to="/login" />} />
        </Routes>
      </Router>
    );
  }  
}

export default App;
