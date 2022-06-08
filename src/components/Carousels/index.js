import React from 'react';
import { Carousel } from "react-bootstrap";

function Carousels() {
    return ( 
        <Carousel variant="dark">
              <Carousel.Item interval={2000}>
                  <img
                  className="d-block"
                  style={{ height: 300 }}
                  src="https://img.freepik.com/foto-gratis/banner-horizontal-pila-libros-lado-derecho-proyectos-educativos_351987-173.jpg"
                  alt="First slide"
                  />
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                  <img
                  className="d-block"
                  style={{ height: 300 }}
                  src="https://t3.ftcdn.net/jpg/04/27/15/08/360_F_427150821_oQOZiOLP6lnWQdUmUG0YgQiTUsjmaGwE.jpg"
                  alt="Second slide"
                  />
              </Carousel.Item>
              <Carousel.Item interval={2000}>
                  <img
                  className="d-block"
                  style={{ height: 300 }}
                  src="http://images6.fanpop.com/image/photos/40600000/Book-Banner-Header-booknerd-40619463-950-323.jpg"
                  alt="Third slide"
                  />
              </Carousel.Item>
          </Carousel>
    );
}

export default Carousels;