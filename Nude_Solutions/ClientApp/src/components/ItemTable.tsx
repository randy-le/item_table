import * as React from 'react';
import { useEffect, useState } from 'react';
import { AddItemBar } from './AddItemBar';
import './ItemTable.css';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export interface Item {
    id?: number;
    name: string;
    price: number | string;
    category: string;
}

export function ItemTable() {
    const [ rows, setRows ] = useState( [] );
    const [bottomRow, setBottomRow] = useState( {} );
    const categories = [ `Los Angeles Lakers`, `Portland Trailblazers`, `Phoenix Suns` ];

    // initial fetch of data
    useEffect( () => {  
        getItems();
    }, [] );

    return (
        <div className={ `ag-theme-alpine grid-div` } style={ { height: 500, width: 393 } }>
            <AgGridReact
                rowData={rows}
                gridOptions={ {
                    rowClassRules: { 'category-header': 'data.header === 1', 'total-price': 'data.totalPrice === 1' }
                } }
                pinnedBottomRowData={ [ bottomRow ] }
            >
                <AgGridColumn field={ `name` }></AgGridColumn>
                <AgGridColumn field={ `price` } width={ 125 }></AgGridColumn>
                <AgGridColumn headerName={ `` } field={ `id` } cellRendererFramework={ ( params ) => deleteCellRenderer( params ) } width={ 50 }></AgGridColumn>
            </AgGridReact>
            <AddItemBar handleAdd={ addItem } categories={ categories }></AddItemBar>
        </div>
    );

    /**
     * Updates the rows to be displayed.
     *  Sorts items based on categories
     *  Totals the price of all items of a category
     *  Inserts category headers
     *  Adds total price to footer
     */
    function calculateRows( data ) {
        // find unique categories
        let categories = new Set();
        for ( const item of data ) {
            categories.add( item.category );
        }

        // sort the categories
        const sortedCategories = Array.from( categories.values() ).sort();

        // for each category, group their respective items
        let displayRows: Item[] = [];
        let totalPrice = 0;
        sortedCategories.map( category => {
            let categoryTotal = 0; // total price of all items in the category
            let rows = [];

            for ( const item of data ) {
                if ( item.category === category ) {
                    // don't mutate original data, append $ to price
                    let tempItem = { ...item };
                    tempItem.price = `$` + item.price.toString();

                    rows.push( tempItem );
                    categoryTotal += item.price;
                }
            }

            // add category header to the top of the rows
            rows.unshift( { name: category, price: `$` + categoryTotal, header: 1 } );

            // add to rows to be displayed
            displayRows = displayRows.concat(rows);

            // add category total to total price
            totalPrice += categoryTotal;
        } );

        // update the table with all rows
        setRows( displayRows );

        // set bottom row as total price
        setBottomRow( { name: `TOTAL`, price: `$` + totalPrice, totalPrice: 1 } );
    }

    // api call to fetch items
    async function getItems() {
        const response = await fetch( 'items' );
        const data = await response.json();
        calculateRows( data );
    }

    // api call to add an item
    async function addItem( item: Item ) {
        const response = await fetch( 'items', {
            method: `post`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( item )
        } );

        const data = await response.json();
        calculateRows( data );
    }

    // api call to delete an item
    async function deleteItem( id: Number ) {
        const response = await fetch( `items/${ id }`, { method: `post` } );
        const data = await response.json();
        calculateRows( data );
    }

    // helper function to tell the grid how to render the delete cell row
    function deleteCellRenderer( params: any ) {
        if ( params.data.header !== 1 && params.data.totalPrice !== 1 ) {
            return (
                <i
                    className="fa fa-trash"
                    style={ { fontSize: `20px`, cursor: `pointer` } }
                    onClick={ () => deleteItem( params.data.id ) }>
                </i>
            )
        } else {
            return ``;
        }
    }
}