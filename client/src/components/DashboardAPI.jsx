import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import { FaArrowUp } from "react-icons/fa";

function DashboardAPI({ searchTerm }) {
  const [backendData, setBackendData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredResults, setFilteredResults] = useState([]);
  const [sortDirection, setSortDirection] = useState({}); // State to track sort direction of each column

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/database");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBackendData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const filteredData = backendData.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filteredData);
    setPage(0);
  }, [searchTerm, backendData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (column) => {
    const newSortDirection = { ...sortDirection };

    if (newSortDirection[column] === undefined) {
      newSortDirection[column] = "asc";
    } else if (newSortDirection[column] === "asc") {
      newSortDirection[column] = "desc";
    } else {
      newSortDirection[column] = "asc";
    }

    setSortDirection(newSortDirection);
    sortTableData(column, newSortDirection[column]);
  };

  const sortTableData = (column, direction) => {
    const sortedData = [...filteredResults];

    sortedData.sort((a, b) => {
      if (direction === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setFilteredResults(sortedData);
  };

  const getSortArrow = (column) => {
    if (sortDirection[column] === "asc") {
      return (
        // ARROWS WITH ROTATE ANIMATION
        <span>
          <FaArrowUp
            style={{
              transform: "rotate(0deg)",
              transition: "transform 150ms ease",
            }}
          />
        </span>
      ); // Upward arrow symbol
    } else if (sortDirection[column] === "desc") {
      return (
        <span>
          <FaArrowUp
            style={{
              transform: "rotate(180deg)",
              transition: "transform 150ms ease",
            }}
          />
        </span>
      ); // Downward arrow symbol
    } else {
      return null;
    }
  };

  return (
    <div>
      <Container className="card-body" sx={{ py: 5 }}>
        <div>
          <TableContainer component={Paper}>
            <Table
              aria-label="crypto dashboard"
              className="dashboard-bg dashboard-tb"
              style={{ padding: "2rem" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 2 }} align="left" className="ps-5">
                    <button
                      className="tableHeader"
                      onClick={() => handleSort("name")}
                    >
                      Name {getSortArrow("name")}
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <button
                      className="tableHeader"
                      onClick={() => handleSort("current_price")}
                    >
                      Price {getSortArrow("current_price")}
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="tableHeader"
                      onClick={() => handleSort("price_change_percentage_24h")}
                    >
                      (24h) % {getSortArrow("price_change_percentage_24h")}
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="tableHeader"
                      onClick={() => handleSort("total_volume")}
                    >
                      24h Volume {getSortArrow("total_volume")}
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      className="tableHeader"
                      onClick={() => handleSort("market_cap")}
                    >
                      Market Cap {getSortArrow("market_cap")}
                    </button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredResults
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((d) => (
                    <TableRow
                      key={d.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align=""
                        className="ps-5 text-white fw-bold"
                        component="th"
                        scope="row"
                      >
                        <>
                          <Box
                            component="img"
                            sx={{
                              maxWidth: 30,
                              maxHeight: 30,
                            }}
                            src={d.image}
                            alt={d.name}
                            className="rounded-circle "
                          ></Box>{" "}
                          &nbsp;&nbsp;
                          {d.name}
                        </>
                      </TableCell>
                      <TableCell align="left" className="text-white fw-bold">
                        {formatCurrency(d.current_price)}
                      </TableCell>
                      <TableCell align="center" className="text-white fw-bold">
                        {d.price_change_percentage_24h}
                      </TableCell>
                      <TableCell align="center" className="text-white fw-bold">
                        {formatCurrency(d.total_volume)}
                      </TableCell>
                      <TableCell align="center" className="text-white fw-bold">
                        {formatCurrency(d.market_cap)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableRow align="right">
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={filteredResults.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  variant="outlined"
                  className="text-white mt-2 mb-2"
                />
              </TableRow>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </div>
  );
}

export default DashboardAPI;
