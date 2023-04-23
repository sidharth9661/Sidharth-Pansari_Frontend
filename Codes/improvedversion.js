import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ isSelected, onClick, text }) => {
  return (
    <li style={{ backgroundColor: isSelected ? 'green' : 'red' }} onClick={onClick}>
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = useCallback(
    (index) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex]
  );

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map(({ text }, index) => (
        <SingleListItem
          key={index}
          onClick={() => handleClick(index)}
          text={text}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;


/*

The code seems to be written in a reasonably optimized way already, but there are a few possible improvements that could be made:

1.  Use the useCallback hook to memoize the handleClick function in the List component. 
    This can improve performance by preventing the function from being re-created on every render.

2.  Use the key prop in the SingleListItem component to pass the index prop directly instead of using it as a separate prop. 
    This can improve performance by reducing the number of props passed to each component.

Here's the code with these optimizations applied:


*/