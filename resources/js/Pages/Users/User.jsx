import PaginateTable from "@/Components/Common/PaginateTable";


export default function UsersPage() {

    const columns = [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "status",
            label: "Status",
            render: (row) => (
                <span className={row.status ? "text-green-600" : "text-red-600"}>
                    {row.status ? "Active" : "Inactive"}
                </span>
            ),
        },
    ];

    const users = [
        { name: "John", email: "john@test.com", status: 1 },
        { name: "Alex", email: "alex@test.com", status: 0 },
    ];

    return (
        <PaginateTable
            title="Users"
            data={users}
            columns={columns}
            searchKeys={["name", "email"]}
            onAdd={() => console.log("Open Add User Modal")}
            filters={[
                {
                    key: "status",
                    label: "All Status",
                    options: [
                        { label: "Active", value: 1 },
                        { label: "Inactive", value: 0 },
                    ],
                },
            ]}
        />
    );
}