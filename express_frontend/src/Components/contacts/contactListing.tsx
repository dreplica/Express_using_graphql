import React from 'react';
import { connect } from 'react-redux';

interface Iprops{
    children: React.ReactNode;
    data: Array<{ fname: string | undefined; lname: string | undefined }>;
}

 const showContacts:React.FC<Iprops> = ({data})=> {
  return (
    <>
    
    </>
  );
}

const Connecting = connect();

export default Connecting;