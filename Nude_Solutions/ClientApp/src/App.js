import React from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { ItemTable } from './components/ItemTable';
import './custom.css';

export default function App () {
    return (
      <Layout>
        <Route exact path='/' component={ ItemTable }/>
      </Layout>
    );
}