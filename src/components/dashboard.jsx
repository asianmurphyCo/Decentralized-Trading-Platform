// import

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import axios from 'axios'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,Container,TablePagination } from '@mui/material';
import { useEffect, useState } from 'react';





function Dashboard() {

    // Fetching data from Client-Side Data for Front-end
    const [data,setData] = useState(null);
    const [page,setPage] = useState(0);

    //  Setting up rowsPerPage useState
    const [rowsPerPage,setRowsPerPage] = useState(10);
  

    //  Change URL later due to being broke, cannot afford good api
    const url = '/data/markets.json';


    //  Fetch data from url
    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    },[]);

    //  If no response data, return null
    if(!data) return null;

    //  Handle change page for pagination
    const handleChangePage = (e,p) =>{
        setPage(p);
    }

    //  Handle change row per page
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    }


    // Format JSON data about prices into readable amount of money in USD
    function formatCurrency (amount) {
        const formattedAmount = Number(amount).toLocaleString('en-US',{
            style:'currency',
            currency:'USD',
            minimumFractionDigits:0,
            maximumFractionDigits:6,
        });

        return formattedAmount;
    }

    return (
    
        <Container sx={{py:5}}>
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="crypto dashboard">

                    {/*Table Head */}
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{width:2}} align="center">Name</TableCell> {/* Image + Symbol + Name*/}
                            <TableCell  align="center">Price</TableCell>
                            <TableCell  align="center">% Change (24h)</TableCell>
                            <TableCell  align="center">24h Volume</TableCell>
                            <TableCell  align="center">Market Cap</TableCell>
                        </TableRow>
                    </TableHead>

                    {/*Table Body */}
                    <TableBody>
                    {data.slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage).map((d) => (
                        <TableRow
                        key={d.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                           
                           <>
                           <Box component="img"
                           sx={{
                            maxWidth:30,
                            maxHeight:30
                           }}
                           
                            src={d.image}></Box> {d.name} 
                            </>
                        </TableCell>
                        <TableCell align="center">{formatCurrency(d.current_price)}</TableCell>
                        <TableCell align="center">{d.price_change_percentage_24h }</TableCell>
                        <TableCell align="center">{formatCurrency(d.total_volume)}</TableCell>
                        <TableCell align="center">{formatCurrency(d.market_cap)}</TableCell>
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

            
        </div>
        </Container>
        
    )

}
export default Dashboard