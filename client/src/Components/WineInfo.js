import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const WineInfo = (props) => (
    <Table bordered hover className='margin-top'>
        <thead>
            <tr><th colSpan="2">Information</th></tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Lot Code</strong></td>
                <td>{props.selectedWine.lotCode}</td>
            </tr>
            <tr>
                <td><strong>Description</strong></td>
                <td>{props.selectedWine.description} <Button variant="outline-dark" className='edit-button'>Edit</Button></td>
            </tr>
            <tr>
                <td><strong>Volume</strong></td>
                <td>{props.selectedWine.volume} litres</td>
            </tr>
            <tr>
                <td><strong>Tank</strong></td>
                <td>{props.selectedWine.tankCode}</td>
            </tr>
            <tr>
                <td><strong>Product State</strong></td>
                <td>{props.selectedWine.productState} <Button variant="outline-dark" className='edit-button'>Edit</Button></td>
            </tr>
            <tr>
                <td><strong>Owner</strong></td>
                <td>{props.selectedWine.ownerName}</td>
            </tr>
        </tbody>
    </Table>
);

export default WineInfo;