import React, { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { columns, initialSubmissionState } from './columns';

const CustomTextField = styled(TextField)`
  & .MuiInput-underline:before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12); /* Lighter and thinner line */
  }
  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.87); /* Slightly thicker line on hover */
  }
  & .MuiInput-underline:after {
    border-bottom: 1px solid rgba(0, 0, 0, 0.87); /* Line when focused */
  }
`;

// AddForm component for adding new submissions
const AddForm = ({ addSubmission }) => {
  const [newData, setNewData] = useState(initialSubmissionState);

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewData({ ...newData, [name]: value });
  };

  const handleAddClick = () => {
      addSubmission(newData);
      setNewData(initialSubmissionState);
  };

  return (
      <TableRow>
          <TableCell component="th" scope="row">New</TableCell>
          {columns.map((column) => (
              <TableCell key={column.id}>
                  <CustomTextField
                      type="text"
                      name={column.id}
                      value={newData[column.id]}
                      onChange={handleInputChange}
                      variant="standard"
                      fullWidth
                  />
              </TableCell>
          ))}
          <TableCell>
              <Button onClick={handleAddClick}>Add</Button>
          </TableCell>
      </TableRow>
  );
};

export default AddForm;
