import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TableComp({data}) {
  const history = useHistory();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           <TableCell>Action To See Graphs</TableCell>
            <TableCell>Repository name</TableCell>
            <TableCell >Repository description</TableCell>
            <TableCell >Number of stars for the repo</TableCell>
            <TableCell >Number of issues for the repo.</TableCell>
            <TableCell >Username</TableCell>
            <TableCell >Avtar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell >
                <Button color='primary' onClick={() => history.push(`/graph/${row.owner.login}/${row.name}`)}>
                  showing Weekly or additions or deletions
                 </Button>
                 <Button color='secondary' onClick={() => history.push(`/contributor/${row.owner.login}/${row.name}`)}>
                  per contributor additions/deletions/commits
                 </Button>
              </TableCell>
              
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.description}</TableCell>
              <TableCell >{row.score}</TableCell>
              <TableCell >{row.open_issues}</TableCell>
              <TableCell >{row.owner.login}</TableCell>
              <TableCell ><img src={row.owner.avatar_url} height="100px" width="100px" /> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
