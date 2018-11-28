import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import { connect } from 'react-redux';
import { getCatalogueDataByChaincodeKey } from '../../redux/actions/CAT/catalogue.action';

let BOMcounter = 0;
let SARcounter = 0;
let PRDcounter = 0;

const BOMrows = [
    { id: 'BOMKey', label: 'System Data by Material ID' },
];

const SARrows = [
    { id: 'SARKey', label: 'System Data by Shipment ID' },
];

const PRDrows = [
    { id: 'PRDKey', label: 'System Data by Production Order No.' },
];

class BOMTableHeader extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {BOMrows.map(row => {
                        return (
                            <TableCell key={row.id}>
                                {row.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

BOMTableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
};

class SARTableHeader extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {SARrows.map(row => {
                        return (
                            <TableCell key={row.id}>
                                {row.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

SARTableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
};

class PRDTableHeader extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {PRDrows.map(row => {
                        return (
                            <TableCell key={row.id}>
                                {row.label}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }
}

PRDTableHeader.propTypes = {
    rowCount: PropTypes.number.isRequired,
};

class CatalogueView extends React.Component {

    componentDidMount() {
        !this.isCancelled && Promise.resolve(this.props.getCatalogueDataByChaincodeKey('BOM'))
            .then(() => {
                this.setState({
                    BOMdata: this.createBOMTableContent()
                })
                Promise.resolve(this.props.getCatalogueDataByChaincodeKey('SAR'))
                    .then(() => {
                        this.setState({
                            SARdata: this.createSARTableContent()
                        })
                        Promise.resolve(this.props.getCatalogueDataByChaincodeKey('PRD'))
                            .then(() => {
                                this.setState({
                                    PRDdata: this.createPRDTableContent()
                                })
                            });
                    })
            })
    }

    componentWillUnmount() {
        this.isCancelled = true;
    };

    constructor(props) {
        super(props);
        this.state = {
            showProgressLogo: false,
            BOMdata: [],
            BOMpage: 0,
            BOMrowsPerPage: 10,
            SARdata: [],
            SARpage: 0,
            SARrowsPerPage: 10,
            PRDdata: [],
            PRDpage: 0,
            PRDrowsPerPage: 10,
            value: 0
        };
    }

    createBOMTableContent = () => {
        let tableContent = [];
        let createData = (key) => {
            BOMcounter += 1;
            return {
                id: BOMcounter,
                key,
            };
        };
        if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess) {
            if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems &&
                this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length > 0) {
                for (let i = 0; i < this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length; i++) {
                    if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i] !== 'string') {
                        let tmp = this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i];
                        tableContent.push(
                            createData(
                                tmp
                            ));
                    }
                }
            }
        }
        return tableContent;
    };

    createSARTableContent = () => {
        let tableContent = [];
        let createData = (key) => {
            SARcounter += 1;
            return {
                id: SARcounter,
                key,
            };
        };
        if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess) {
            if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems &&
                this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length > 0) {
                for (let i = 0; i < this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length; i++) {
                    if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i] !== 'string') {
                        let tmp = this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i];
                        tableContent.push(
                            createData(
                                tmp
                            ));
                    }
                }
            }
        }
        return tableContent;
    };

    createPRDTableContent = () => {
        let tableContent = [];
        let createData = (key) => {
            PRDcounter += 1;
            return {
                id: PRDcounter,
                key,
            };
        };
        if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess) {
            if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems &&
                this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length > 0) {
                for (let i = 0; i < this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems.length; i++) {
                    if (this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i] !== 'string') {
                        let tmp = this.props.data.catReducer.getCatalogueDataByChaincodeKeySuccess.chainItems[i];
                        tableContent.push(
                            createData(
                                tmp
                            ));
                    }
                }
            }
        }
        return tableContent;
    };

    handleChange = (event, val) => {
        this.setState({
            value: val
        })
        //value = val;
    };

    handleClose = () => {
        this.props.viewHandler();
    };

    handleChangeBOMPage = (event, BOMpage) => {
        this.setState({ BOMpage });
    };

    handleChangeSARPage = (event, SARpage) => {
        this.setState({ SARpage });
    };

    handleChangePRDPage = (event, PRDpage) => {
        this.setState({ PRDpage });
    };

    handleChangeBOMRowsPerPage = event => {
        this.setState({ BOMrowsPerPage: event.target.value });
    };

    handleChangeSARRowsPerPage = event => {
        this.setState({ SARrowsPerPage: event.target.value });
    };

    handleChangePRDRowsPerPage = event => {
        this.setState({ PRDrowsPerPage: event.target.value });
    };

    render() {

        const { value,
            BOMdata, BOMrowsPerPage, BOMpage,
            SARdata, SARrowsPerPage, SARpage,
            PRDdata, PRDrowsPerPage, PRDpage } = this.state;

        const BOMemptyRows = BOMrowsPerPage - Math.min(BOMrowsPerPage, BOMdata.length - BOMpage * BOMrowsPerPage);
        const SARemptyRows = SARrowsPerPage - Math.min(SARrowsPerPage, SARdata.length - SARpage * SARrowsPerPage);
        const PRDemptyRows = PRDrowsPerPage - Math.min(PRDrowsPerPage, PRDdata.length - PRDpage * PRDrowsPerPage);

        return (
            <Dialog
                open={true}
                onClose={this.handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Tabs fullWidth value={value} onChange={this.handleChange}>
                        <Tab label="BOM" />
                        <Tab label="SAR" />
                        <Tab label="PRD" />
                    </Tabs>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {value === 0 &&
                            <div>
                                <Table>
                                    <BOMTableHeader
                                        rowCount={BOMdata.length}
                                    />
                                    <TableBody style={{ "overflowWrap": "break-word" }}>
                                        {BOMdata
                                            .slice(BOMpage * BOMrowsPerPage, BOMpage * BOMrowsPerPage + BOMrowsPerPage)
                                            .map(n => {
                                                return (
                                                    <TableRow hover
                                                        tabIndex={-1} key={n.id}>
                                                        <TableCell>
                                                            {n.key}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {BOMemptyRows > 0 && (
                                            <TableRow style={{ height: 49 * BOMemptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={BOMdata.length}
                                    rowsPerPage={BOMrowsPerPage}
                                    page={BOMpage}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={this.handleChangeBOMPage}
                                    onChangeRowsPerPage={this.handleChangeBOMRowsPerPage}
                                />
                            </div>}
                        {value === 1 &&
                            <div>
                                <Table>
                                    <SARTableHeader
                                        rowCount={SARdata.length}
                                    />
                                    <TableBody style={{ "overflowWrap": "break-word" }}>
                                        {SARdata
                                            .slice(SARpage * SARrowsPerPage, SARpage * SARrowsPerPage + SARrowsPerPage)
                                            .map(n => {
                                                return (
                                                    <TableRow hover
                                                        tabIndex={-1} key={n.id}>
                                                        <TableCell>
                                                            {n.key}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {SARemptyRows > 0 && (
                                            <TableRow style={{ height: 49 * SARemptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={SARdata.length}
                                    rowsPerPage={SARrowsPerPage}
                                    page={SARpage}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={this.handleChangeSARPage}
                                    onChangeRowsPerPage={this.handleChangeSARRowsPerPage}
                                />
                            </div>}
                        {value === 2 &&
                            <div>
                                <Table>
                                    <PRDTableHeader
                                        rowCount={PRDdata.length}
                                    />
                                    <TableBody style={{ "overflowWrap": "break-word" }}>
                                        {PRDdata
                                            .slice(PRDpage * PRDrowsPerPage, PRDpage * PRDrowsPerPage + PRDrowsPerPage)
                                            .map(n => {
                                                return (
                                                    <TableRow hover
                                                        tabIndex={-1} key={n.id}>
                                                        <TableCell>
                                                            {n.key}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {PRDemptyRows > 0 && (
                                            <TableRow style={{ height: 49 * PRDemptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    component="div"
                                    count={PRDdata.length}
                                    rowsPerPage={PRDrowsPerPage}
                                    page={PRDpage}
                                    backIconButtonProps={{
                                        'aria-label': 'Previous Page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'Next Page',
                                    }}
                                    onChangePage={this.handleChangePRDPage}
                                    onChangeRowsPerPage={this.handleChangePRDRowsPerPage}
                                />
                            </div>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
            </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCatalogueDataByChaincodeKey: (key) => dispatch(getCatalogueDataByChaincodeKey(key))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueView);