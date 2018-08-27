import React from 'react';
import EBOMMain from './ebom.main.view';
import EBOMReview from './ebom.review.view';

class EBOMView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEBOMMain: true,
            showEBOMReview: false,
            data: ''
        };
        this.handleData = this.handleData.bind(this);
    }

    handleData(data) {
        this.setState({
            showEBOMMain: data.showEBOMMain,
            showEBOMReview: data.showEBOMReview,
            data: data
        });
    }

    render() {
        return (
            <div id="ebomView">
                {this.state.showEBOMMain === true ? <EBOMMain show={this.state.showEBOMMain === true} viewHandler={this.handleData}/>
                : ""}
                {this.state.showEBOMReview === true ? <EBOMReview data={this.state} show={this.state.showEBOMReview === true}  />
                    : ""}
            </div>
        )
    }

}

export default EBOMView;