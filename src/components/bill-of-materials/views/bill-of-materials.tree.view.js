import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tree from 'react-d3-tree';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

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

class BillOfMaterialsTree extends React.Component {

    componentDidMount = () => {
        const dimensions = this.treeContainer.getBoundingClientRect();
        !this.isCancelled && this.setState({
            translate: {
                x: dimensions.width / 3,
                y: dimensions.height / 3
            }
        });
    };

    componentWillUnmount() {
        this.isCancelled = true;
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
                sbColor: ''
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
            <div className='Module'>
                <div>
                    <div className='Module-Container' ref={tc => (this.treeContainer = tc)}>
                        <Tree data={myTreeData} translate={this.state.translate} orientation={'horizontal'} />
                    </div>
                    <Grid container spacing={24}>
                        <Grid container item xs={12}>
                            <Button type='button' value='Close' variant='contained'
                                    className='Module-Button-Cancel' fullWidth={true}
                                    onClick={this.handleClose}>
                                Close
                                <Cancel className='Module-Button-Icon' />
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <Snackbar open={this.props.snackbar.open} autoHideDuration={this.props.snackbar.autoHideDuration}
                          onClose={this.handleSnackbarClose}>
                    <SnackbarContent
                        message={this.props.snackbar.message}
                        className={this.props.snackbar.sbColor}
                        classes={{ message: 'Module-Snackbar-Message' }}
                    />
                </Snackbar>
            </div>
        )

    }

}