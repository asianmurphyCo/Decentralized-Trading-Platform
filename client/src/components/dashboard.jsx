import React, { useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Form from "react-bootstrap/Form";
import DashboardAPI from './DashboardAPI';

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Container className="card-body" sx={{ py: 5 }}>
        {/* Search Form */}
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search by coin name"
            className="mx-2 my-2 search-bg"
            aria-label="Search"
            onChange={handleSearch}
          />
        </Form>
        {/* DashboardAPI component */}
        <DashboardAPI searchTerm={searchTerm} />
      </Container>
    </div>
  );
}

export default Dashboard;