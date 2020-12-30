import React from "react";
import Table from "./Table";

// const { charities } = require('../../util/charities');
const contractFunctions = require('../../contracts/utils/functions');
const web3 = contractFunctions.getWeb3();

export class OrgRecordTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contract: props.contract,
            donations: [],
        };
    }
    
    async componentDidMount() {
        if (this.state.donations.length === 0) {
            console.log("awaiting");
            const result = await contractFunctions.getCharityDonations(this.state.contract, web3)
            await setTimeout(() => {
                this.setState({ donations: result});
                //TODO: Have this work without the 2000 ms
            }, 2000);
        }
    }

    render() {
        const columnHeader= [
            // Amount Date Donor Message
            {
                id: 'donor',
                label: 'Donor',
                minWidth: 170,
                align: 'left',
            },
            { 
                id: 'amount',
                label: 'Amount', 
                minWidth: 170,
                align: 'right',
            },
            {
                id: 'date',
                label: 'Date',
                minWidth: 170,
                align: 'left',
            },
            {
                id: 'message',
                label: 'Message',
                minWidth: 170,
                align: 'left',
            },
        ];

        return (
            <div>
                <Table rows={this.state.donations} columns={columnHeader} ></Table>
            </div>
        )
    }
}

export default { OrgRecordTable };