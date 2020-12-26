const columnsCL = [
    { id: 'name', label: 'Name', minWidth: 170 },
    {
        id: 'cause',
        label: 'Cause',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'website',
        label: 'Website',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'right',
    },
];

function createDataCL(name, cause, website, address) {
    return { name, cause, website, address };
}

const rowsCL = [
    createDataCL("Singapore Cancer Society", "Fighting Cancer", "http://www.singaporecancersociety.org.sg/", "15 Enggor Street #04-01/04 Realty Centre, Singapore 079716"),
    createDataCL("Children’s Cancer Foundation", "Fighting Cancer", "https://www.ccf.org.sg/", "8 Sinaran Drive #03-01 Oasia Hotel Novena, Singapore 307470"),
    createDataCL("HCA Hospice Care", "Hospice Care", "http://www.hca.org.sg", "705 Serangoon Road #03-01 Kwong Wai Shiu Hospital, Singapore 328127 "),
    createDataCL("Movement for the Intellectually Disabled of Singapore (MINDS)", "Persons with Intellectual Disability", "http://www.minds.org.sg", "800 Margaret Drive, Singapore 149310")
];

export { rowsCL, columnsCL, createDataCL };