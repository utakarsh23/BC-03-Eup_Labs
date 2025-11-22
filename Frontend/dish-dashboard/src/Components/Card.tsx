import React from 'react';

interface Dish {
    _id: string;
    dishName: string;
    imageUrl: string;
    isPublished: boolean;
}

interface CardProps {
    dish: Dish;
    onTogglePublish: (_id: string) => void;
}

const Card: React.FC<CardProps> = ({ dish, onTogglePublish }) => {
    const handleToggle = () => {
        onTogglePublish(dish._id);
    };

    return (
        <div style={{
            width: "220px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "12px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <img
                src={dish.imageUrl}
                alt={dish.dishName}
                style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderRadius: "8px"
                }}
            />

            <h3 style={{ margin: "10px 0 5px", fontSize: "18px" }}>
                {dish.dishName}
            </h3>

            <span
                style={{
                    fontSize: "12px",
                    color: dish.isPublished ? "#0a7a0a" : "#b40000",
                    backgroundColor: dish.isPublished ? "#d7ffd7" : "#ffd7d7",
                    padding: "3px 8px",
                    borderRadius: "5px",
                    marginBottom: "10px"
                }}
            >
                {dish.isPublished ? "Published" : "Unpublished"}
            </span>

            {/* Toggle Button */}
            <label
                style={{
                    position: "relative",
                    display: "inline-block",
                    width: "45px",
                    height: "24px",
                    cursor: "pointer",
                    marginTop: "8px"
                }}
            >
                <input
                    type="checkbox"
                    checked={dish.isPublished}
                    onChange={handleToggle}
                    style={{
                        opacity: 0,
                        width: 0,
                        height: 0
                    }}
                />

                <span
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: dish.isPublished ? "#28a745" : "#bbb",
                        transition: ".3s",
                        borderRadius: "34px",
                    }}
                />

                <span
                    style={{
                        position: "absolute",
                        height: "18px",
                        width: "18px",
                        left: dish.isPublished ? "21px" : "4px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: ".3s",
                        borderRadius: "50%",
                    }}
                />
            </label>

        </div>
    );
};

export default Card;