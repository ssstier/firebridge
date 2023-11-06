import React, { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { columns } from './columns';

const EditForm = ({ submission, saveEdit, cancelEdit }) => {
  const [editData, setEditData] = useState(submission);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditData({ ...editData, [name]: value });
  };

  return (
      <TableRow>
          <TableCell component="th" scope="row">{editData.id}</TableCell>
          {columns.map((column) => (
              <TableCell key={column.id}>
                  <input 
                      type="text"
                      name={column.id} 
                      value={editData[column.id]} 
                      onChange={handleInputChange} 
                  />
              </TableCell>
          ))}
          <TableCell>
              <Button onClick={() => saveEdit(editData)}>Save</Button>
              <Button onClick={cancelEdit}>Cancel</Button>
          </TableCell>
      </TableRow>
  );
};

export default EditForm;
