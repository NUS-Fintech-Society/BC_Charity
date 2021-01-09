import { searchByUEN } from "firebase";
import React, { useState } from "react";
import Table from "./Table";

const contractFunctions = require("../../contracts/utils/functions");
const Web3 = require("web3");
const web3 = contractFunctions.getWeb3();
const firestore = require("../../firebase");


async function processDonationRecords(records) {

  const donations = await firestore.getDonations();
  console.log(donations);
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
  records.forEach(async (value) => {

    // Add transaction Hash in firestore records.
    const donationHash = Web3.utils.sha3(value.donor + value.amount + value.date + value.message);
    // firestore.getDonation(donationHash).then(donation => {console.log(donation.exists)});
    const donation = await firestore.getDonation(donationHash);
    value['transactionHash'] = (donation.exists) ? donation.data()['transactionHash'] : 'nil';
    



    value.date = String(value.date);
    if (value.date.length === 7) {
      value.date = "0" + value.date;
    }
    let day = value.date.slice(0, 2);
    let mth = value.date.slice(2, 4);
    let yr = value.date.slice(4);
    value.strDate = day + " " + months[Number(mth) - 1] + " " + yr;
    let amt = value.amount;
    value.strAmount = "$" + (Number(amt) / 100).toFixed(2);
    // console.log(value);
  });
  // records.sort((a, b) => a.strDate.slice(7) - b.strDate.slice(7));
  // records.sort((a, b) => a.strDate.slice(7) == b.strDate.slice(7) && Number(a.date.slice(2, 4)) - Number(b.date.slice(2, 4)));
  // records.sort((a, b) => a.strDate.slice(7) == b.strDate.slice(7) && Number(a.date.slice(2, 4)) == Number(b.date.slice(2, 4)) && Number(a.date.slice(0, 2)) - Number(b.date.slice(0, 2)));
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

      // old method
      const result = await contractFunctions.getCharityDonations(
        this.state.contract,
        web3
      );
      await setTimeout(async () => {
        const processedDonations = await processDonationRecords(result);
        this.setState({ donations: processedDonations });
        console.log(this.state.donations);
        //TODO: Have this work without the 2000 ms
      }, 5000);
    }
  }

  render() {
    console.log(this.state.donations)
    const columnHeader = [
      // Amount Date Donor Message
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
      { id: "transactionHash", label: "Transaction Hash", minWidth: 170, align: "left" },
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
      await setTimeout(async () => {
        let processed = result.map((value) => {
          const { charity, amount, date, message, donor } = value;
          const charityName = charity.name;
          return { charityName, amount, date, message, donor };
        });
        processed = await processDonationRecords(processed);
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
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
      { id: "transactionHash", label: "Transaction Hash", minWidth: 170, align: "left" },
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
    await setTimeout(async () => {
      const processed = await processDonationRecords(result);
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
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 170, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
      { id: "transactionHash", label: "Transaction Hash", minWidth: 170, align: "left" },
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
