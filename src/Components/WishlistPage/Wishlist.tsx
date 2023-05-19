import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Col, Card, Modal, Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getSessionStorage } from '../../Services/LocalStorage';
import CpuList from '../Lists/CpuList';
import { CpuData, GpuData, CaseData, HardDriveData, MotherboardData, HeatsinkData, PowerSupplyData, RamData, WishlistData } from '../../Interfaces/PartDataInterfaces';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { GetAllWishlistItems } from '../../Services/DataService';


const Wishlist = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GuestView = () => {
    let token = localStorage.getItem('BuildCompToken');
    if (token == 'guest') {
      return (
        <>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className='d-flex justify-content-center align-items-center'
          >
            <Modal.Body>
              You will need to sign up to see more features
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
              <Button variant="primary" onClick={() => navigate('/SignUp')}>Create Account?</Button>
              <Button variant="primary" onClick={() => navigate('/Login')}>Login</Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    } else {
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllWishlistItems();
      const username = sessionStorage.getItem("Username");
      const filteredData = data.filter((item: WishlistData) => item.username === username);
      setWishlistItems(filteredData);
    };

    fetchData();
  }, []);


  const SwitchSession = () => {
    if (wishlistItems.map((x: any) => x.type == "CPU")) {
      return wishlistItems.map((x: CpuData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div className='d-grid justify-content-center 2fr'>
                <div key={x.id}>
                  <Card style={{ width: '16rem', height: '100%', overflow: 'hidden' }}>
                    <Link to={x.item_url} target='_blank'>
                      <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: '16rem', margin: '0 auto' }} />
                    </Link>
                    <Card.Body>
                      <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                      <div>
                        <div>${x.price}<a className='DeleteWishlistBtn'><HighlightOffIcon /></a></div>
                        <div>{x.type}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Col>
          </>
        );
      });
    } else if (wishlistItems.map((x: any) => x.type == "GPU")) {
      wishlistItems.map((x: GpuData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else if (wishlistItems.map((x: any) => x.type == "Case")) {
      wishlistItems.map((x: CaseData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else if (wishlistItems.map((x: any) => x.type == "Motherboard")) {
      wishlistItems.map((x: MotherboardData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else if (wishlistItems.map((x: any) => x.type == "RAM")) {
      wishlistItems.map((x: RamData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else if (wishlistItems.map((x: any) => x.type == "Power Supply")) {
      wishlistItems.map((x: PowerSupplyData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else if (wishlistItems.map((x: any) => x.type == "Heatsink")) {
      wishlistItems.map((x: HeatsinkData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    } else {
      wishlistItems.map((x: HardDriveData) => {
        return (
          <>
            <Col className='wishlistCards'>
              <div key={x.id}>
                <Card style={{ width: '16rem', height: '100%' }}>
                  <Link to={x.item_url} target='_blank'>
                    <Card.Img className='item-image' variant="top" src={x.image_url} style={{ width: '100%', height: "auto" }} />
                  </Link>
                  <Card.Body>
                    <Link to={x.item_url} target='_blank'><u className='title'>{x.title}</u></Link>
                    <div>
                      <div>${x.price}<a className='WishlistBtn'><HighlightOffIcon /></a></div>
                      <div>{x.type}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </>
        )
      })
    }

  }

  return (
    <div>

      <Navbar />
      <div className='d-flex justify-content-center'>
        <Col className='wishlist-content'>
          <GuestView />
          <Row>
            {SwitchSession() || null}
          </Row>
        </Col>
      </div>
      <Footer />
    </div>
  )
};

export default Wishlist;