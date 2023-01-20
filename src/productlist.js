import React, { useState, useEffect } from 'react';
import './product.css';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState(false);


    const handleReadMoreClick = () => {
        setShowFullDescription(!showFullDescription);
    }
    

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="product-list">
            {products.map((product) => (
                <div className="product-frame" key={product.id}>
                    <div><img src={product.image} alt=""/></div>
                    <h4>{product.title}</h4>
                    <p>Price: {product.price}</p>
                    {!showFullDescription && <p>{product.description.substring(0, 100)}...</p>}
                    {!showFullDescription && (
                        <button class="btn" onClick={handleReadMoreClick}>Read More</button>
                    )}
                    {showFullDescription && (
                        <>
                            <p>{product.description}</p>
                            <button class="btn" onClick={handleReadMoreClick}>Read Less</button>
                        </>
                    )}
                </div>
            ))}
        </div>

    );
}

export default ProductList;
