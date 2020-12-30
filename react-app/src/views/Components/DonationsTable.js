import React from "react";
import Table from "./Table";

// const { charities } = require('../../util/charities');
const contractFunctions = require('../../contracts/utils/functions');
const web3 = contractFunctions.getWeb3();

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

class RecordsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.contract,
            donations: []
        };
        console.log(this.state);
        console.log("Displayed Records Table state");
    }
    
    async componentDidMount() {
        const result = await contractFunctions.getCharityDonations(this.state.contract, web3)
        console.log(result);
        this.setState({ donations: result});
        console.log(this.state);
        console.log("Displayed Records Table state");
    }

    render() {
        console.log(this.state);
        console.log("Rerendered Records Table state");
        const test = [
            {
                amount: '20',
                date: '27122020',
                donor: 'tssgd',
                message: 'hello 2',
            },
            {
                amount: "10",
                date: "27122020",
                donor: "sdfsdf",
                message: "hello 1",
            },
            {
                amount: "30",
                date: "27122020",
                donor: "sdfsfd",
                message: "hello 3",
            },
        ];
        const test2 = this.state.donations;
        console.log(test);
        console.log(test2);
        // return <Table rows={this.state.donations} columns={columnHeader} ></Table>
        return <Table rows={test2} columns={columnHeader} ></Table>
    }
}

export default {columnHeader, RecordsTable};