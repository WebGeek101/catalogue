import Modal from 'react-modal';
import './product.css';
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Piedata = () => {
    const [OpenModal, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const chartData = data.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = 1;
                    } else {
                        acc[product.category]++;
                    }
                    return acc;
                }, {});

                setChartData({
                    labels: Object.keys(chartData),
                    datasets: [{
                        data: Object.values(chartData),
                        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#FDB89C'],
                    }],
                    
                });
            });
    }, []);


    return (
        <> 
        <button id="fixedbutton" onClick={handleOpenModal}>Analyse</button>
            <Modal
                isOpen={OpenModal}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Products Modal"
            >
                <button id="fixedbutton1" onClick={handleCloseModal}>close</button>
                <Pie data={chartData} />
            </Modal>

        </>
    );
}

export default Piedata;

