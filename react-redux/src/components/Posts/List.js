import React from 'react';

import Item from './Item';
import Process from '../Common/Process';

const List = ({ list, loading }) => {
  const renderEmpty = () => <h3 style={{ textAlign: 'center' }}>No posts</h3>;

  if (!list.length) return renderEmpty();

  if (loading) return <Process />;

  return (
    <>
      {list.map(el => (
        <Item post={el} key={el._id} />
      ))}
    </>
  );
};

export default List;
