import React from "react";
import Table from "./Table";

const contractFunctions = require("../../contracts/utils/functions");
const web3Sha3 = require("web3").utils.sha3;
const web3 = contractFunctions.getWeb3();
const firestore = require("../../firebase");

/**
 * Formats donation records.
 * @param records is the records from smart contract
 * @returns formatted record to be used
 */
function processDonationRecords(records) {
  records.forEach(async (value) => {
    if (value.date.length === 7) {
      value.date = "0" + value.date;
    }

    // Add transaction hash in firestore records.
    const donationHash = web3Sha3(
      value.donor + value.amount + value.date + value.message
    );
    const donation = await firestore.getDonation(donationHash);
    value["transactionHash"] = donation.exists
      ? donation.data()["transactionHash"]
      : "nil";

    // Format date into field strDate
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    value.date = String(value.date);
    let day = value.date.slice(0, 2);
    let mth = value.date.slice(2, 4);
    let yr = value.date.slice(4);
    value.strDate = day + " " + months[Number(mth) - 1] + " " + yr;

    // Format date into field strAmount
    let amt = value.amount;
    value.strAmount = "$" + (Number(amt) / 100).toFixed(2);
  });

  // Sort record in descending order of date
  records.sort((a, b) => {
    // Pad comparatees with 0 if required
    if (a.date.length === 7) {
      a.date = "0" + a.date;
    }
    if (b.date.length === 7) {
      b.date = "0" + b.date;
    }

    // Sort in order of year, month then day
    const oppA = a.date.slice(4) + a.date.slice(2, 4) + a.date.slice(0, 2);
    const oppB = b.date.slice(4) + b.date.slice(2, 4) + b.date.slice(0, 2);
    return oppB - oppA;
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
      // old method
      const result = await contractFunctions.getCharityDonations(
        this.state.contract,
        web3
      );
      await setTimeout(async () => {
        const processedDonations = await processDonationRecords(result);
        this.setState({ donations: processedDonations });
        //TODO: Have this work without the 2000 ms
      }, 3000);
    }
  }

  render() {
    // console.log("render...")
    // console.log(this.state.donations);
    const columnHeader = [
      { id: "donor", label: "Donor", minWidth: 170, align: "left" },
      { id: "strAmount", label: "Amount", minWidth: 100, align: "right" },
      { id: "strDate", label: "Date", minWidth: 170, align: "left" },
      { id: "message", label: "Message", minWidth: 170, align: "left" },
      {
        id: "transactionHash",
        label: "Transaction Hash",
        minWidth: 170,
        align: "left",
        render: (rowData) => <div>helloo</div>,
      },
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
      const result = await contractFunctions.getAllDonations(web3);
      await setTimeout(async () => {
        let processed = result.map((value) => {
          const { charity, amount, date, message, donor } = value;
          const charityName = charity.name;
          return { charityName, amount, date, message, donor };
        });
        processed = await processDonationRecords(processed);
        this.setState({ donations: processed });
        //TODO: Have this work without the 2000 ms
      }, 2000);
    }
  }

  render() {
    const columnHeader = [
      // Amount Date Donor Message
      { id: "charityName", label: "Charity", minWidth: 170, align: "left" },
      { id: "donor", label: "Donor", minWidth: 170, align: "right" },
      { id: "strAmount", label: "Amount", minWidth: 100, align: "right" },
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
    if (this.props.nricHash !== this.state.nricHash) {
      this.refreshDonations();
    }
    const columnHeader = [
      // Amount Date Donor Message
      { id: "strAmount", label: "Amount", minWidth: 100, align: "right" },
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
