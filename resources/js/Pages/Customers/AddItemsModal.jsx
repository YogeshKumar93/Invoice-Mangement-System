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
        const updated = items.filter((_, i) => i !== index);

        setItems(updated);
    };

    const handleSave = () => {
        console.log(customer);
        console.log(items);

        onClose();
    };

    return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6">

                <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                    Add Items - {customer?.name}
                </h2>

                {items.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 gap-3 mb-3"
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
                            className="border p-2 rounded"
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
                            className="border p-2 rounded"
                        />

                        <button
                            onClick={() =>
                                removeRow(index)
                            }
                            className="bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="flex gap-2 mt-4">

                    <button
                        onClick={addRow}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        + Add More
                    </button>

                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
        </div>
    );
}