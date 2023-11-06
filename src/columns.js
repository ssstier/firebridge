export const columns = [
    { id: 'Name', label: 'Name' },
    { id: 'Age', label: 'Age' },
    { id: 'City', label: 'City', },
    { id: 'Country', label: 'Country', },
    { id: 'Email', label: 'Email', },
    { id: 'Phone', label: 'Phone', },
  ];
  
  // You could also export the initial state for new submissions if it's standardized
  export const initialSubmissionState = {
    Name: '',
    Age: '',
    City: '',
    Country: '',
    Email: '',
    Phone: '',
  };