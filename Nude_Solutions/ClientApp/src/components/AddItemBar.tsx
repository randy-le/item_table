import * as React from 'react';
import { useState } from 'react';
import { Item } from './ItemTable';
import './AddItemBar.css';
import { AddIcon } from 'evergreen-ui';

interface Props {
    handleAdd: ( item: Item ) => void;
    categories: string[];
}

export function AddItemBar( props: Props ) {
    const [ name, setName ] = useState( `` );
    const [ price, setPrice ] = useState( 0 );
    const [ category, setCategory ] = useState( props.categories[0] );

    return (
        <div className={ `add-item-bar` }>
            <input
                className={ `item-name` }
                placeholder={ `Item Name` }
                onChange={ ( e ) => {
                    setName( e.target.value );
                }}
            >
            </input>
            <input
                className={ `item-price` }
                placeholder={ `Price` }
                onChange={ ( e ) => {
                    setPrice( Number( e.target.value ) );
                } }
                type={ `number` }
            >
            </input>
            <select
                placeholder={ `categories` }
                className={ `item-categories` }
                name={ `categories` }
                id={ `categories` }
                defaultValue={ `` }
                onChange={ ( e ) => {
                    setCategory( e.target.value );
                } }
            >
                {
                    props.categories.map( category => {
                        return (
                            <option
                                value={ category }
                                key={ category }
                                title={ category }
                            >
                                { category }
                            </option>
                        );
                    } )
                }
            </select>
            <AddIcon size={ 24 } onClick={ handleAdd }/>
        </div>  
    );

    function handleAdd() {
        const item = {
            "name": name,
            "price": price,
            "category": category,
            "id": 0
        }
        props.handleAdd( item );
    }
}