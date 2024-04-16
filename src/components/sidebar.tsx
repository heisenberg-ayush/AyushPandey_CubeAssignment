// import { IconType } from 'react-icons'
// import { AiFillFileText } from 'react-icons/ai'
// import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from 'react-icons/fa'
// import { IoIosPeople } from 'react-icons/io'
// import { RiCoupon3Fill, RiDashboardFill, RiShoppingBag3Fill } from 'react-icons/ri'
// import { RiCoupon3Fill } from 'react-icons/ri'
import { Location, Link, useLocation } from 'react-router-dom'

function sidebar() {

// eslint-disable-next-line react-hooks/rules-of-hooks
const location = useLocation()

  return (
    <aside>
        <DivOne location={location}/>
    </aside>
  )
}

const DivOne = ({ location }: locationPropType) => {
    const components = [];
  
    // Loop to create 1000 components
    for (let i = 0; i < 1000; i++) {
      const componentInfo = {
        index: i,
        name: `Customer ${String(i + 1).padStart(2, '0')}`,
        title: 'Software Engineer',
        address: '101, Bangalore',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt beatae harum voluptates nisi maxime, quos a aut fuga, voluptas, excepturi voluptatum dolorem adipisci iste omnis! Sit repellat laborum inventore repudiandae."
      };
  
      components.push(
        <div key={i} className='somediv'>
        <Link to={`/?search=${encodeURIComponent(JSON.stringify(componentInfo.index))}`} 
        className='linky' 
        style={
        {  backgroundColor: location.pathname.includes("/") && location.search.includes(`search=${i}`) ? "rgb(247,247,247)" : "white" }
        }>
          <h3>{componentInfo.name}</h3>
          <h4>{componentInfo.title}</h4>
          <p>{componentInfo.description}</p>
          </Link>
        </div>
      );
    }
  
    return <>{components}</>;
  };


interface locationPropType{
    location: Location
}

export default sidebar