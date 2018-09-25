import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tree from 'react-d3-tree';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '../../../../node_modules/@material-ui/core/colors/red';
import Snackbar from 'material-ui/Snackbar';

const myTreeData = [
    {
        name: 'Root',
        attributes: {
            timestamp: 'Apr 7 07:34:11',
            block: 'Instantiated worldcrop',
        },
        children: [
            {
                name: 'Entity_1',
                attributes: {
                    timestamp: 'Apr 7 07: 34: 40 ',
                    block: 'Updated worldcorp',
                },
                children: [
                    {
                        name: 'Entity_3',
                        attributes: {
                            timestamp: 'Apr 7 07:36:05',
                            block: 'Finalized worldcorp',
                        }
                    },
                ]
            },
            {
                name: 'Entity_2',
                attributes: {
                    timestamp: 'Apr 7 07: 34: 40 ',
                    block: 'Refactored worldcorp',
                },
                children: [
                    {
                        name: 'Entity_4',
                        attributes: {
                            timestamp: 'Apr 7 07:36:05',
                            block: 'Finalized worldcorp',
                        },
                    },
                    {
                        name: 'null',
                        attributes: {
                            timestamp: 'null',
                            block: 'null',
                        },
                    },
                ]
            },
        ],
    },
];

const containerStyles = {
    width: '100%',
    height: '100vh',
};

class BillOfMaterialsTree extends React.Component {

    componentDidMount = () => {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 3,
                y: dimensions.height / 3
            }
        });
    };

    state = {};

    constructor(props) {
        super(props);
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                autoHideDuration: 2000,
                message: '',
                open: false,
                sbColor: 'black'
            },
        });
    };

    handleClose = (event) => {
    };

    render() {

        const buttonTheme = createMuiTheme({
            palette: {
                primary: red
            },
        });

        return (
            <div style={{padding: 24}}>
                <div>
                    <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                        <Tree data={myTreeData} translate={this.state.translate} orientation={'horizontal'}/>
                    </div>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <MuiThemeProvider theme={buttonTheme}>
                                <Button type="submit" value="Close" variant="contained" color="primary"
                                        fullWidth={true} onClick={this.handleClose}>
                                    Close
                                </Button>
                            </MuiThemeProvider>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={this.state.snackbar.autoHideDuration}
                    onRequestClose={this.handleSnackbarClose}
                    bodyStyle={{backgroundColor: this.state.snackbar.sbColor}}
                />
            </div>
        )

    }
}

export default BillOfMaterialsTree;