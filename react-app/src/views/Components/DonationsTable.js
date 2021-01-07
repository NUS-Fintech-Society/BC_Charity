import { searchByUEN } from "firebase";
import React from "react";
import Table from "./Table";

const contractFunctions = require("../../contracts/utils/functions");
const web3 = contractFunctions.getWeb3();

function processDonationRecords(records) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  records.sort((a, b) => Number(a.date) - Number(b.date));
  records.forEach((value) => {
    let day = value.date.slice(0, 2);
    let mth = value.date.slice(2, 4);
    let yr = value.date.slice(4);
    value.strDate = day + " " + months[Number(mth) - 1] + " " + yr;
    let amt = value.amount;
    value.strAmount = "$" + (Number(amt) / 100).toFixed(2);
  });
  return records;
}

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
        const processedDonations = processDonationRecords(result);
        this.setState({ donations: processedDonations });
        //TODO: Have this work without the 2000 ms
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
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
        let processed = result.map((value) => {
          const { charity, amount, date, message, donor } = value;
          const charityName = charity.name;
          return { charityName, amount, date, message, donor };
        });
        processed = processDonationRecords(processed);
        this.setState({ donations: processed });
        console.log(this.state.donations);
        //TODO: Have this work without the 2000 ms
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "charityName", label: "Charity", minWidth: 170, align: "left" },
      // { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
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
    console.log(props);
    this.state = {
      nricHash: props.nricHash,
      donations: [],
    };
  }

  async componentDidMount() {
    await this.refreshDonations();
  }

  async refreshDonations() {
    await this.setState({ nricHash: this.props.nricHash });
    const result = await contractFunctions.getAllUserDonations(
      this.state.nricHash,
      web3
    );
    await setTimeout(() => {
      const processed = processDonationRecords(result);
      this.setState({ donations: processed });
      //TODO: Have this work without the 2000 ms
    }, 2000);
  }

  render() {
    console.log(this.props.nricHash);
    console.log(this.props.nricHash === this.state.nricHash);
    if (this.props.nricHash !== this.state.nricHash) {
      this.refreshDonations();
    }
    console.log(
      "0x0000000000000000000000000000000000000000000000000000000000000001" ===
        this.state.nricHash
    );
    console.log(this.state.nricHash);
    const columnHeader = [
      // Amount Date Donor Message
      // { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
    ];

    return (
      <div>
        <Table
          rows={this.state.donations}
          columns={columnHeader}
          nricHash={this.props.nricHash}
        ></Table>
      </div>
    );
  }
}
