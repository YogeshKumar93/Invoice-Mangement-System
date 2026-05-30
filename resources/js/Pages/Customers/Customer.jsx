import React from "react";

export default function Customer({ customers }) {

    return (
        <div className="p-6">

            <div className="flex justify-between mb-4">

                <h1 className="text-2xl font-bold">
                    Customers
                </h1>

            </div>

            <div className="bg-white rounded shadow">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.data.map((customer) => (

                            <tr key={customer.id}>

                                <td>{customer.name}</td>

                                <td>{customer.email}</td>

                                <td>{customer.phone}</td>

                                <td>
                                    {customer.status
                                        ? "Active"
                                        : "Inactive"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}