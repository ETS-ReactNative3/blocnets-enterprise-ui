import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import response from './sample.json';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import yellow from "@material-ui/core/colors/yellow";


let counter = 0;

function createData(messageType, messageDescription, messageDate) {
    counter += 1;
    return {id: counter, messageType, messageDescription, messageDate};
}

function createTableContent() {
    let tableContent = [];
    for (let i = 0; i < response[0].messages.length; i++) {
        if (response[0].messages[i].status === 'pending') {
            tableContent.push(createData(response[0].messages[i].type, response[0].messages[i].desc, response[0].messages[i].date));
        }
    }
    return tableContent;
}

const rows = [
    {id: 'messageType', label: 'Message Type'},
    {id: 'messageDescription', label: 'Message Description'},
    {id: 'messageDate', label: 'Date'}
];

class TableHeader extends React.Component {
    render() {
        const {onSelectAllClick, numSelected, rowCount} = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                            >
                                {row.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

TableHeader.propTypes = {
    onSelectAllClick: PropTypes.func.isRequired,
    numSelected: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
};

class DocumentReviewEntryView extends React.Component {

    state = {
        selected: [],
        data: createTableContent(),
        page: 0,
        rowsPerPage: 10,
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {

        const {classes} = this.props;
        const {data, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const buttonTheme = createMuiTheme({
            palette: {
                primary: yellow
            },
        });

        return (
            <div style={{padding: 24}}>
                <Grid container justify="center">
                    <Grid container item xs={12}>
                        <Paper style={{"width": "100%"}}>
                            <Table style={{"overflowX": "auto"}}>
                                <TableHeader
                                    numSelected={selected.length}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    rowCount={data.length}
                                />
                                <TableBody>
                                    {data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(n => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox onClick={event => this.handleClick(event, n.id)}
                                                                  checked={isSelected}/>
                                                    </TableCell>
                                                    <TableCell>{n.messageType}</TableCell>
                                                    <TableCell>{n.messageDescription}</TableCell>
                                                    <TableCell>{n.messageDate}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 49 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Grid>
                </Grid>
                <br/>
                <Grid container spacing={24}>
                    <Grid container item xs={12} sm={3}>
                        <Grid>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Upload" variant="contained"
                                        color="primary">
                                    Upload...
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3}>
                        <Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3}>
                        <Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} sm={3}>
                        <Grid container item xs justify="flex-end">
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Approve" variant="contained"
                                        color="primary">
                                    Approve
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                        <Grid container item xs justify="flex-end">
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Reject" variant="contained"
                                        color="primary">
                                    Reject
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );

    }

}

DocumentReviewEntryView.propTypes = {
    classes: PropTypes.object,
};

export default DocumentReviewEntryView;