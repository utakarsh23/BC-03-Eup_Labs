import { useEffect, useState } from "react";
import Card from "./Components/Card.tsx";
import { io, Socket } from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface Dish {
    _id: string;
    dishName: string;
    imageUrl: string;
    isPublished: boolean;
}

let socket: Socket;

function App() {
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [newDish, setNewDish] = useState({
        dishName: "",
        imageUrl: "",
        isPublished: false,
    });

    const fetchDishes = async () => {
        try {
            const res = await fetch(`${API_URL}/dishes/v1/get`);
            const data = await res.json();
            setDishes(data?.dishes || []);
        } catch (err) {
            console.error("Error fetching dishes:", err);
        }
    };

    const createDish = async () => {
        try {
            const res = await fetch(`${API_URL}/dishes/v1/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newDish),
            });

            if (!res.ok) return console.error("Error creating dish:", res.statusText);

            const createdData = await res.json();
            setNewDish({ dishName: "", imageUrl: "", isPublished: false });

        } catch (err) {
            console.error("Error posting dishes:", err);
        }
    };

    const togglePublish = async (dishId: string) => {
        try {
            await fetch(`${API_URL}/dishes/v1/switch/${dishId}`, {
                method: "PUT",
            });
        } catch (err) {
            console.error("Error toggling publish:", err);
        }
    };

    useEffect(() => {
        fetchDishes();

        socket = io(API_URL);

        socket.on("dish-updated", (updated: Dish) => {
            setDishes((prev) =>
                prev.map((d) => (d._id === updated._id ? updated : d))
            );
        });

        socket.on("dish-created", (newDish: Dish) => {
            setDishes((prev) => [...prev, newDish]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            <div style={{ padding: "16px" }}>
                <h2>Dish Dashboard</h2>

                {/* Add Dish Form */}
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Dish Name"
                        value={newDish.dishName}
                        onChange={(e) =>
                            setNewDish({ ...newDish, dishName: e.target.value })
                        }
                        style={{
                            marginRight: "8px",
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newDish.imageUrl}
                        onChange={(e) =>
                            setNewDish({ ...newDish, imageUrl: e.target.value })
                        }
                        style={{
                            marginRight: "8px",
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            width: "200px",
                        }}
                    />

                    <label style={{ marginRight: "10px" }}>
                        <input
                            type="checkbox"
                            checked={newDish.isPublished}
                            onChange={(e) =>
                                setNewDish({ ...newDish, isPublished: e.target.checked })
                            }
                        />
                        Published
                    </label>

                    <button
                        onClick={createDish}
                        style={{
                            padding: "6px 12px",
                            border: "none",
                            background: "#007bff",
                            color: "#fff",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Add Dish
                    </button>
                </div>
            </div>

            <div
                style={{
                    padding: "16px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "16px",
                }}
            >
                {dishes.map((dish) => (
                    <Card key={dish._id} dish={dish} onTogglePublish={togglePublish} />
                ))}
            </div>
        </>
    );
}

export default App;