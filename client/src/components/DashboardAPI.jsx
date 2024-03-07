import React, { useEffect, useState } from 'react';
import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import * from "./firebaseConfig";

function DashboardAPI() {
  const [backendData, setBackendData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    //   .then(response => response.json())
    //   .then(data => {
    //     setBackendData(data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    const starCountRef = ref(db, "posts/" + postId + "/starCount");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredResults = backendData.slice().filter((d) => {
    // Perform any filtering logic here if needed
    return true;
  });

  return (
    <div>
      <Container className="card-body" sx={{ py: 5 }}>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="crypto dashboard">
              {/* Table Head */}
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 2 }} align="center">Name</TableCell> {/* Image + Symbol + Name*/}
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">% Change (24h)</TableCell>
                  <TableCell align="center">24h Volume</TableCell>
                  <TableCell align="center">Market Cap</TableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {filteredResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => (
                  <TableRow
                    key={d.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      <>
                        <Box component="img"
                          sx={{
                            maxWidth: 30,
                            maxHeight: 30
                          }}
                          src={d.image}
                          alt={d.name}
                        ></Box> {d.name}
                      </>
                    </TableCell>
                    <TableCell align="center">{formatCurrency(d.current_price)}</TableCell>
                    <TableCell align="center">{d.price_change_percentage_24h}</TableCell>
                    <TableCell align="center">{formatCurrency(d.total_volume)}</TableCell>
                    <TableCell align="center">{formatCurrency(d.market_cap)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableRow align="right">
                <Box>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={filteredResults.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    variant='outlined'
                  />
                </Box>
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
}

export default DashboardAPI;