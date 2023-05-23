import React, { useState } from "react";
import { Route, Switch } from "react-router-dom"

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Decks/DeckList"
import CreateDeck from "./Decks/CreateDeck";
import Deckrector from "./Decks/Deckrector";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <Deckrector />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
