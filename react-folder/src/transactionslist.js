const columnsTL = [
    { id: 'donor', label: 'Donor', minWidth: 170 },
    {
        id: 'charity',
        label: 'Charity',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'amount',
        label: 'Amount Donated',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'remarks',
        label: 'Remarks',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'left',
    },
];

function createDataTL(donor, charity, amount, remarks, date) {
    return { donor, charity, amount, remarks, date };
}

const rowsTL = [
    createDataTL("SAMPLE_HASH_1", "Singapore Cancer Society", "$1,000", "Boooo cancer", "01 Jan 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
    createDataTL("SAMPLE_HASH_2", "HCA Hospice Care", "$100,000", "Sending love to grandma", "18 Mar 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
    createDataTL("SAMPLE_HASH_2", "Children’s Cancer Foundation", "$5,000", "BOOOOO cancer", "23 Feb 2020"),
];

export { rowsTL, columnsTL, createDataTL };