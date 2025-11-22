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

            <button
                onClick={() => onTogglePublish(dish._id)}
                style={{
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    backgroundColor: dish.isPublished ? "#ff5c5c" : "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "0.2s"
                }}
            >
                {dish.isPublished ? "Unpublish" : "Publish"}
            </button>

        </div>
    );
};

export default Card;