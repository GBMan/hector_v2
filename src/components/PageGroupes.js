import React, { useContext } from 'react';
import { CatalogueContext } from './App';
import BtnGroupe from './BtnGroupe';
import BtnOeuvre from './BtnOeuvre';
import {
  Route,
  Switch,
  Link,
  useRouteMatch
} from 'react-router-dom';
import datasHolder from '../DatasHolder';

export default function PageGroupes() {
  console.log("### PageGroupes");
  
  const { handleOpenGalerie } = useContext(CatalogueContext);
  const { url } = useRouteMatch();
  const datas = datasHolder.getDatasFromRoute(url);
  const railRoad = datasHolder.getRailRoadFromRoute(url);

  function handleClickImg(id) {
    handleOpenGalerie(id, datas);
  }
  if (!datas) return (<></>);
  return (
    <>
      <Switch>
        <Route path={`${url}/:url`}>
          <PageGroupes />
        </Route>
        <Route path={`${url}`}>
          <section className="page page-groupes">
            <h2 className="page-groupes--title">
              {railRoad.map((step, i) => {
                return (
                  <React.Fragment key={i}>
                    {(i > 0) && <span> / </span>}
                    <Link to={step.route} className="btn ">{step.title}</Link>
                  </React.Fragment>
                )})
              }
            </h2>
            <div className="page-groupes--container">
              {(datas[0].type === "groupe") &&
                datas.map((groupe, i) => {
                  return (
                    <BtnGroupe
                      key={i}
                      {...groupe}
                    />
                  )
                })
              }
              {(datas[0].type === "oeuvre") &&
                datas.map((oeuvre, i) => {
                  return (
                    <BtnOeuvre
                      key={i}
                      position={i}
                      {...oeuvre}
                      handleClickImg={handleClickImg}
                      cssClass="btn--groupe-img-container"
                    />
                  )
                })
              }
            </div>
          </section>
        </Route>
      </Switch>
    </>
  )
}