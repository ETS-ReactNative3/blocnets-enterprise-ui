import React from 'react';
import Tree from 'react-d3-tree';

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
            <div className='Module'>
                <div>
                    <div className='TT-Tree' ref={tc => (this.treeContainer = tc)}>
                        <Tree data={this.props.data.tree} orientation={'horizontal'} translate={this.state.translate} />
                    </div>
                </div>
            </div>
        )
    }

}

export default TrackAndTraceTreeView;