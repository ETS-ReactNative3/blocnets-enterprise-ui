import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchByKeyword } from '../../redux/actions/track-and-trace.view.action';
import Tree from 'react-d3-tree';


class TrackAndTrace extends Component {
    
    componentDidMount() {
        this.props.searchByKeyword();
    }

    render() {

        const userIconStyle = {
            transform: "scale(2.1)"
        }

        const messageIconStyle = {
            transform: "scale(1.0)"
        }

        const myTreeData = [
            {
                name: this.props.searchByKeyword,
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
                                }
                            },
                        ]
                    },
                ],
            },
        ];

        return (
            <MuiThemeProvider theme={theme}>
                {/* Main navigation bar menu for components */}
                <AppBar position="static"
                    className="App-header"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}>
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                            <ToolbarTitle text={<img src={logo} className="App-logo" alt="logo" />} alt="Blocnets" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="search-with-icon-adornment">Search</InputLabel>
                                <Input
                                    id="search-with-icon-adornment"
                                    label="Search field"
                                    type="search"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <IconButton aria-label="4 pending messages">
                                <Badge badgeContent={4} color="secondary" style={messageIconStyle}>
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                        </Grid>
                        <Grid item xs={2}>
                            <UserIcon style={userIconStyle} />
                        </Grid>
                        <Tree data={myTreeData} />
                        
                    </Grid>
                </AppBar>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    return{
        searchByKeword : state.searchStore.results
    }
}

export default connect(mapStateToProps, { searchByKeword })(TrackAndTrace);