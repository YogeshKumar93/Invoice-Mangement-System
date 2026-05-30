import { usePage } from "@inertiajs/react";
import PaginateTable from "@/Components/Common/PaginateTable";

export default function UsersPage() {

    const { users } = usePage().props;

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

    return (
        <PaginateTable
            title="Users"
            data={users}
            columns={columns}
            searchKeys={["name", "email"]}
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