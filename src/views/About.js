import React from 'react';
import { Row, Col, CardTitle, Card } from 'reactstrap';
// import ComponentCard from '../components/ComponentCard';
import about from '../assets/images/bg/DayWise.jpg'


const About = () => {

  return (
    <Row>
      {/* <h1>Capability and Features</h1> */}
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}

        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            {/* <i className="bi bi-bell me-2"> </i> */}
            <h3>About US</h3>
          </CardTitle>
          <Row className='d-flex'>
            <Col lg="8">
              <div className="mt-3 p-3"  >
                <p  align="justify">
                     &nbsp; &nbsp;&nbsp;   THETAVEGA TECH, founded in 2020, focuses on Internet of Things-based solutions for the manufacturing sector. The organization serves as a partner in technology-driven business transformation and provides a low-risk global delivery model for successful project completion. THETAVEGA TECH develops products, puts strategic plans into action, and streamlines operations in dynamic digital settings by cooperating with multinational enterprises and cutting-edge technology. <br />

                     &nbsp; &nbsp;&nbsp; THETAVEGA TECH works on IoT-based “Smart Industry” Solutions for Manufacturing Industries, as a partner to conceptualize and realize technology-driven business transformation Initiatives. We provide solutions for any Dynamic Environment where Business and Technology Strategies converge to enhance their Productivity and Profitability Together by using a low-risk Global Delivery Model (GDM) to accelerate schedules with a high degree of Time and Cost Predictability.  
                  <br />
                  &nbsp; &nbsp;&nbsp;  Their knowledge is broad and includes areas like AI, cloud computing, quality management, and assembly. They reduce complexity, improve productivity, and promote real business growth through new techniques. The company's dedication to innovation goes beyond technology, influencing its ethical standards and network of information. THETAVEGA TECH seeks to serve as the premier strategic partner for manufacturing excellence.
                </p>
              </div>
              <h6 style={{ paddingLeft: '5%'}}> Email: tejas@thetavega.tech </h6>
              <h6 style={{ paddingLeft: '5%' }}>  Contact Us: +919371675893 </h6>
              
              
            </Col>
            <Col>
            <div className=' m-4' style={{ marginTop: '0%'}}>

            
           <img src={about} alt='not found' style={{ width: '100%', height: '22rem' }} />
           </div>

            </Col>
          </Row>
          {/* <ComponentCard title="Features">
            <Row>
             
            </Row>
          </ComponentCard> */}
        </Card>
      </Col>

    </Row>
  );
};

export default About;

