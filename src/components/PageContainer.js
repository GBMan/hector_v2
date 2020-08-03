import React, {useState} from 'react'
import PageHome from './PageHome';
import PageGroupes from './PageGroupes';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import {
  Switch, 
  Route,
  useLocation
} from "react-router-dom";

export default function PageContainer({categories}) {
    console.log("### PageContainer");

    const location = useLocation();
    const [cssTransitioning, setCssTransitioning] = useState("");
    const [previousLocation, setPreviousLocation] = useState(location.pathname);

    function handleTransitionEnter() {
        let currentDeep = location.pathname.split("/").slice(1)
        if (currentDeep[currentDeep.length-1] === "") currentDeep.pop()
        currentDeep = currentDeep.length
        let previousDeep = previousLocation.split("/").slice(1)
        if (previousDeep[previousDeep.length-1] === "") previousDeep.pop()
        previousDeep = previousDeep.length
        let deepNav = "out"
        if (currentDeep > previousDeep) {
            deepNav = "in"
        }
        setPreviousLocation(location.pathname)
        setCssTransitioning(`transitioning ${deepNav}`)
    }
    function handleTransitionExited() {
        setCssTransitioning("")
    }

    return (
        <div className={`page-container ${cssTransitioning}`}>
            <TransitionGroup>
                <CSSTransition
                key={location.key}
                classNames="page-fade"
                timeout={300}
                onEnter={() => handleTransitionEnter()}
                onExited={() => handleTransitionExited()}>
                    <Switch location={location}>
                        <Route path="/:url">
                            <PageGroupes />
                        </Route>
                        <Route path="/">
                            <PageHome categories={categories} className="mabite" />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}
