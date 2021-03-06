import { useState, useEffect } from "react";
import fetch from "axios";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Player from "./components/Player";
import Wrapper from "./components/Wrapper";
import PhotoGallery from "./components/PhotoGallery";
import MapContainer from "./components/MapContainer";
import Footer from "./components/Footer";
import CharacteristicTable, { Row } from "./components/CharacteristicTable";
import Tile from "./components/Tile";
import PricingTable, { PricingRow } from "./components/PricingTable";
import ToHome from "./components/ArrowTop";
 
export type Photo = {
  img: string
  title: string
  content: string
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [characteristics, setCharacteristics] = useState<Row[]>([]);
  const [pricing, setPricing] = useState<PricingRow[]>([]);

  useEffect(() => {
    async function getData() {
      try {

        const results = await fetch.all([
          fetch("http://localhost:3000/photos", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }), 
          fetch("http://localhost:3000/characteristics", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }),
          fetch("http://localhost:3000/pricing", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
        ]);

        setPhotos(results[0].data.photos);
        setCharacteristics(results[1].data.characteristics);
        setPricing(results[2].data.pricing);

      } catch(err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  return (
    <div>
      <Header/>
      <Hero>
          <div>
            <h1>EcoTank L8180</h1>
            <p>Фотопринтер EcoTank формату A3+</p>
          </div>
          <img src="/images/printer.png" alt=""/>
      </Hero>
      <ToHome/>
      <div id="review"></div>
      <Tile><h2>Загальний огляд</h2></Tile>
      <Wrapper>
        <PhotoGallery photos={photos}/>
      </Wrapper>
      <div id="abilities"></div>
      <Tile><h2>Можливості</h2></Tile>
      <Showcase/>
      <div style={{ marginTop: "1em" }} id="media"></div>
      <Tile><h2>Медіа</h2></Tile>
      <Wrapper>
        <Player title="ECOTANK L8180" />
      </Wrapper>
      <div id="characteristics"></div>
      <Tile><h2>Характеристики</h2></Tile>
      <Wrapper>
        <CharacteristicTable table={characteristics}/>
      </Wrapper>
      <div id="dillers"></div>
      <Tile><h2>Дилери</h2></Tile>
      <Wrapper>
        <PricingTable header="Дилери" pricingTable={pricing}/>
      </Wrapper>
      <div id="service-centres"></div>
      <Tile><h2>Сервісні центри в Києві</h2></Tile>
      <Wrapper>
        <MapContainer/>
      </Wrapper>
      <Footer/>
    </div>
  );
}

export default App;
