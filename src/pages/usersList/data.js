export const columns = [
    {
      Header: "SR No",
      accessor: 'id',
      width: "40px"
    },
    {
      Header: "First Name",
      accessor: 'firstName',
      width: "90px"
    },
    {
      Header: "Last Name",
      accessor: 'lastName',
      width: "90px"
    },
    {
      Header: "Email",
      accessor: 'email',
      width: "200px"
    },
    {
      Header: "Approved",
      accessor: 'approval',
      width: "60px",
      Cell: ({ cell: { value } }) => <span>{value ? "True" : "False"}</span>,
    }
];