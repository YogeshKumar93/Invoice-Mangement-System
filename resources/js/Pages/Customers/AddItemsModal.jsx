import React, { useState } from "react";

export default function AddItemsModal({
    open,
    onClose,
    customer,
}) {
    const [items, setItems] = useState([
        {
            product_name: "",
            price: "",
        },
    ]);

    if (!open) return null;

    const handleChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const addRow = () => {
        setItems([
            ...items,
            {
                product_name: "",
                price: "",
            },
        ]);
    };

    const removeRow = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const totalAmount = items.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
    );

    const handleSave = () => {
        console.log(customer);
        console.log(items);

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Add Items
                        </h2>

                        <p className="text-sm text-gray-500">
                            Customer : {customer?.name}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">

                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-semibold">
                            ₹ {totalAmount}
                        </div>

                        <button
                            onClick={onClose}
                            className="text-xl font-bold text-gray-500 hover:text-red-500"
                        >
                            ✕
                        </button>

                    </div>
                </div>

                {/* Body */}
                <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">

                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3"
                        >
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={item.product_name}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "product_name",
                                        e.target.value
                                    )
                                }
                                className="flex-1 border rounded-md px-3 py-2"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "price",
                                        e.target.value
                                    )
                                }
                                className="w-32 border rounded-md px-3 py-2"
                            />

                            {/* Add Button */}
                            <button
                                type="button"
                                onClick={addRow}
                                className="bg-green-600 text-white px-3 py-2 rounded-md text-sm"
                            >
                                +
                            </button>

                            {/* Remove Button */}
                            {items.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeRow(index)}
                                    className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
                                >
                                    -
                                </button>
                            )}
                        </div>
                    ))}

                </div>

                {/* Footer */}
                <div className="border-t px-5 py-4 flex justify-end gap-2">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
                    >
                        Save Items
                    </button>

                </div>

            </div>
        </div>
    );
}