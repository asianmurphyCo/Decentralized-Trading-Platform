//import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,Container,TablePagination,CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

function TransactionHistory() {

        // Fetching data from Client-Side Data for Front-end
        const [data,setData] = useState(null);
        const [page,setPage] = useState(0);
    
        //  Setting up rowsPerPage useState
        const [rowsPerPage,setRowsPerPage] = useState(10);
      
    
        //  Change URL later due to being broke, cannot afford good api
        const url = '/data/mock_transaction.json';
    
    
        //  Fetch data from url
        useEffect(() => {
            axios.get(url).then((response) => {
                setData(response.data)
            }).catch((error) =>{
                console.log(error)
            })
        },[]);
    
        //  If no response data, return loading
        if(!data) {
            return (
                <Box sx={{ display: 'flex' , alignContent:'center'}}>
                    <CircularProgress />
                </Box>
            )
        };
    
        //  Handle change page for pagination
        const handleChangePage = (e,p) =>{
            setPage(p);
        }
    
        //  Handle change row per page
        const handleChangeRowsPerPage = (e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
        }

    return (
        <Container sx={{py: 2,}}>
            <Box>
                <TableContainer component={Paper}>
                    <Table aria-label="crypto dashboard">

                        {/*Table Head */}
                        <TableHead >
                            <TableRow>
                                <TableCell sx={{width:2}} align="center">Transaction ID</TableCell> {/*In SHA-256*/}
                                <TableCell  align="center">Date & Time</TableCell>
                                <TableCell  align="center">Type</TableCell> {/*Buy,Swap,Sell,Transfer */}
                                <TableCell  align="center">Asset</TableCell> {/* Type of Asset */}
                                <TableCell  align="center">Amount</TableCell> {/* */}
                                <TableCell  align="center">Status</TableCell> {/*Completed, Pending */}
                                <TableCell  align="center">Confirmation</TableCell> {/* Number of confirmations received for the transaction */}
                            </TableRow>
                        </TableHead>

                        {/*Table Body */}
                        <TableBody>
                        {data.slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage).map((d) => (
                            <TableRow
                            key={d.transaction_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center" component="th" scope="row">
                            
                            {d.transaction_id}
                            </TableCell>
                            <TableCell align="center">{d.date_time}</TableCell>
                            <TableCell align="center">{d.type}</TableCell>
                            <TableCell align="center">{d.asset}</TableCell>
                            <TableCell align="center">{d.amount}</TableCell>
                            <TableCell align="center">{d.status}</TableCell>
                            <TableCell align="center">{d.confirmations}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>

                            <TableRow align="right">
                            <Box>
                            
                            <TablePagination
                                    rowsPerPageOptions={[10,20,30]}
                                    component="div"
                                    count={(data.length)}
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
            </Box>
        </Container>

    );
}

export default TransactionHistory