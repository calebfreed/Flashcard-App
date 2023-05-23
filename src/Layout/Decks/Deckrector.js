import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import EditDeck from "./EditDeck";
import AddCardPage from "../Cards/AddCardPage";
import Deck from "./Deck";
import StudyDeck from "./StudyDeck";
import NotFound from "../NotFound";
import EditCard from "../Cards/EditCard";
import CreateDeck from "./CreateDeck";

function Deckrector() {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`}>
                <Deck />
            </Route>
            <Route path={`${path}/edit`}>
                <EditDeck />
            </Route>
            <Route path={`${path}/study`}>
                <StudyDeck />
            </Route>
            <Route path={`${path}/cards/new`}>
                <AddCardPage />
            </Route>
            <Route path={`${path}/cards/:cardId/edit`}>
                <EditCard />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Deckrector;