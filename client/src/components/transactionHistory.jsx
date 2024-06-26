//import

// NEED TO VERIFY BEFORE RENDER THE PAGE
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotFound from "./notfound";
import {
  Box,
  Container,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

function TransactionHistory(props) {
  // Fetching data from Client-Side Data for Front-end
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const username = localStorage.getItem("user");

  const { isLoggedIn } = props;

  //  Setting up rowsPerPage useState
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //  Fetch data from url
  useEffect(() => {
    fetch("/transactionHistoryAPI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.message !== "No record") {
          setData(data);
        }

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  //  If not logged in, won't return
  if (!isLoggedIn) {
    return <NotFound />;
  }

  //  If no response data, return loading
  if (!data) {
    return (
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  //  Handle change page for pagination
  const handleChangePage = (e, p) => {
    setPage(p);
  };

  //  Handle change row per page
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box>
        <TableContainer component={Paper}>
          <Table
            aria-label="transaction-history"
            className="dashboard-bg dashboard-tb"
            style={{ padding: "2rem" }}
          >
            {/*Table Head */}
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ width: 2 }}
                  align="center"
                  className="text-white fw-bold"
                >
                  Transaction ID
                </TableCell>{" "}
                {/*In SHA-256*/}
                <TableCell align="center" className="text-white fw-bold">
                  Date & Time
                </TableCell>
                <TableCell align="center" className="text-white fw-bold">
                  From Address
                </TableCell>{" "}
                {/*Buy,Swap,Sell,Transfer */}
                <TableCell align="center" className="text-white fw-bold">
                  To Address
                </TableCell>{" "}
                {/* Type of Asset */}
                <TableCell align="center" className="text-white fw-bold">
                  Amount
                </TableCell>{" "}
                {/* */}
                <TableCell align="center" className="text-white fw-bold">
                  Status
                </TableCell>{" "}
                {/*Completed, Pending */}
                <TableCell align="center" className="text-white fw-bold">
                  Confirmation
                </TableCell>{" "}
                {/* Number of confirmations received for the transaction */}
              </TableRow>
            </TableHead>

            {/*Table Body */}
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((d, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      className="text-white fw-bold"
                    >
                      {d.transid}
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      {d.transdate}
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      {d.useraddress}
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      {d.taraddress}
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      {d.trans_amount}
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      Completed
                    </TableCell>
                    <TableCell align="center" className="text-white fw-bold">
                      {d.confirmations}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableRow align="right">
              <Box>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  variant="outlined"
                  className="text-white mt-2 mb-2"
                />
              </Box>
            </TableRow>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default TransactionHistory;
