import { searchByUEN } from "firebase";
import React from "react";
import Table from "./Table";

const contractFunctions = require("../../contracts/utils/functions");
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
      const result = await contractFunctions.getCharityDonations(
        this.state.contract,
        web3
      );
      await setTimeout(() => {
        this.setState({ donations: result });
        //TODO: Have this work without the 2000 ms
        //TODO: Sort data & process
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "amount", label: "Amount", minWidth: 170, align: "right" },
      { id: "date", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
    ];

    return (
      <div>
        <Table rows={this.state.donations} columns={columnHeader}></Table>
      </div>
    );
  }
}

export class AllDonationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
    };
  }

  async componentDidMount() {
    if (this.state.donations.length === 0) {
      console.log("awaiting");
      const result = await contractFunctions.getAllDonations(web3);
      await setTimeout(() => {
        const processed = result.map((value) => {
          const { charity, amount, date, message, donor } = value;
          const charityName = charity.name;
          return { charityName, amount, date, message, donor };
        });
        this.setState({ donations: processed });
        console.log(this.state.donations);
        //TODO: Have this work without the 2000 ms
        //TODO: Sort data & process
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "charityName", label: "Charity", minWidth: 170, align: "left" },
      // { id: 'donor', label: 'Donor', minWidth: 170, align: 'left', },
      { id: "amount", label: "Amount", minWidth: 170, align: "right" },
      { id: "date", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
    ];

    return (
      <div>
        <Table rows={this.state.donations} columns={columnHeader}></Table>
      </div>
    );
  }
}

export class UserRecordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nricHash: props.nricHash,
      donations: [],
    };
  }

  async componentDidMount() {
    if (this.state.donations.length === 0) {
      console.log("awaiting");
      const result = await contractFunctions.getAllUserDonations(
        this.state.nricHash,
        web3
      );
      await setTimeout(() => {
        this.setState({ donations: result });
        //TODO: Have this work without the 2000 ms
        //TODO: Sort data & process
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "amount", label: "Amount", minWidth: 170, align: "right" },
      { id: "date", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
    ];

    return (
      <div>
        <Table rows={this.state.donations} columns={columnHeader}></Table>
      </div>
    );
  }
}
