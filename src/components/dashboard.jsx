// import

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';





function Dashboard() {

    // Fetching data from CoinGecko API
    const [data,setData] = useState(null);
  

    //  Change URL later due to being broke, cannot afford good api
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en1';

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    },[]);

    //  If no response data, return null
    if(!data) return null;

  


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
    
        <div>
            <TableContainer component={Paper}>
                <Table aria-label="crypto dashboard">

                    {/*Table Head */}
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell> {/* Image + Symbol + Name*/}
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">% Change (24h)</TableCell>
                            <TableCell align="center">24h Volume</TableCell>
                            <TableCell align="center">Market Cap</TableCell>
                        </TableRow>
                    </TableHead>

                    {/*Table Body */}
                    <TableBody>
                    {data.map((d) => (
                        <TableRow
                        key={d.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="center" component="th" scope="row">
                           
                           <>
                           <Box component="img"
                           sx={{
                            height: 30,
                            width:30,
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

                </Table>
            </TableContainer>
        </div>
        
    )

}
export default Dashboard