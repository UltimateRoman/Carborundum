import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getMemberScoreList} from './utils/web3utils.js';


const columns = [
    { id: 'address', label: 'Member Address', minWidth: 170 },
    { id: 'score', label: 'Trees Donated', minWidth: 100 }
];

const Leaderboard = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [memberScores, setMemberScores] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        async function fetchData() {
            const memberScores = await getMemberScoreList();
            setMemberScores(memberScores);
        }
        fetchData();
    }, [memberScores.length]);
    
    return (
        <React.Fragment>
            <h1>Global Leaderboard</h1>
            <br/><br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper sx={{ width: '50%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memberScores
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, key) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={memberScores.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            </div>
        </React.Fragment>
    );
}

export default Leaderboard;