import React from 'react';
import Tree from 'react-d3-tree';

const containerStyles = {
    width: '100%',
    height: '100vh',
};

class TrackAndTraceTreeView extends React.Component {

    componentDidMount = () => {
        const dimensions = this.treeContainer.getBoundingClientRect();
        !this.isCancelled && this.setState({
            translate: {
                x: dimensions.width / 6,
                y: dimensions.height / 3
            }
        });
    };

    componentWillUnmount() {
        this.isCancelled = true;
    };

    state = {};

    render() {
        return (
            <div style={{padding: 24}}>
                <div>
                    <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                        <Tree data={this.props.data.tree} translate={this.state.translate} orientation={'horizontal'}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default TrackAndTraceTreeView;