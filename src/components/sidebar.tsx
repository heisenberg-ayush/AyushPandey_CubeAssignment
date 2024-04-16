import React from 'react';
import { Location, Link, useLocation } from 'react-router-dom';
import { useSelectedComponent } from '../context/SelectedComponentContext';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside>
      <DivOne location={location} />
    </aside>
  );
};

interface DivOneProps {
  location: Location;
}

const DivOne: React.FC<DivOneProps> = ({ location }) => {
  const { setSelected } = useSelectedComponent();

  const handleComponentClick = (componentInfo: any) => {
    setSelected(componentInfo);
  };

  const components: JSX.Element[] = [];

  // Loop to create 1000 components
  for (let i = 0; i < 1000; i++) {
    const componentInfo = {
      index: i,
      name: `Customer ${String(i + 1).padStart(2, '0')}`,
      title: 'Software Engineer',
      address: '101, Bangalore',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae harum voluptates nisi maxime, quos a aut fuga, voluptas, excepturi voluptatum dolorem adipisci iste omnis! Sit repellat laborum inventore repudiandae.',
    };

    components.push(
      <div key={i} className='somediv'>
        <Link
          to={{
            pathname: '/',
            search: `?search=${encodeURIComponent(JSON.stringify(componentInfo.index))}`,
          }}
          onClick={() => handleComponentClick(componentInfo)}
          className='linky'
          style={{
            backgroundColor:
              location.pathname.includes('/') && location.search.includes(`search=${i}`)
                ? 'rgb(247,247,247)'
                : 'white',
          }}
        >
          <h3>{componentInfo.name}</h3>
          <h4>{componentInfo.title}</h4>
          <p>{componentInfo.description}</p>
        </Link>
      </div>
    );
  }

  return <>{components}</>;
};

export default Sidebar;
