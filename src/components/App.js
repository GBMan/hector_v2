import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/app.scss';
import Header from './Header';
import Footer from './Footer';
import PageContainer from './PageContainer';
import datasHolder from '../DatasHolder';
import Galerie from './Galerie';
import {
  BrowserRouter as Router
} from "react-router-dom";
import DevInfos from './DevInfos';
import { getBaseUrl } from '../gbtools/tools';

export const CatalogueContext = React.createContext();

export default function App() {
  console.log("### App");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);
  const dev = false;
  const [categories, setCategories] = useState([]);
  const [positionImageGalerie, setPositionImageGalerie] = useState(null);
  const [imagesGalerie, setImagesGalerie] = useState(null);
  const baseUrl = getBaseUrl();

  useEffect(() => {
    let cancel;
    axios({
      method: 'GET',
      url: `${baseUrl}/assets/categories-hector.json`
    })
    .then((response) => {
      console.log("%cDatas loaded", "color:#0c0");
      datasHolder.setDatas(response.data);
      setCategories((prevCategories) => {return datasHolder.getDatas()});
      // setLoading(false);
    })
    .catch((error) => {
      console.log(error)
      if (axios.isCancel(error))
          return;
      // setError(true);
    });
    return (() => {return cancel()});
  },
  [baseUrl]);

  const catalogueContextValue = {
    handleOpenGalerie:handleOpenGalerie,
    handleCloseGalerie:handleCloseGalerie
  };

  function handleOpenGalerie(positionImage, images) {
    setPositionImageGalerie(positionImage);
    setImagesGalerie(images);
  }

  function handleCloseGalerie() {
    setImagesGalerie(null);
    setPositionImageGalerie(null);
  }

  return (
    <>
      {dev && <DevInfos />}
      <CatalogueContext.Provider value={catalogueContextValue}>
        {imagesGalerie && <Galerie positionImg={positionImageGalerie} images={imagesGalerie}></Galerie>}
        <Router>
          <Header />
          <PageContainer categories={categories} />
          <Footer categories={categories} />
        </Router>
      </CatalogueContext.Provider>
    </>
  );
}