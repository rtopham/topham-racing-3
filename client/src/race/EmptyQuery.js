import React from 'react'
import {Card} from "react-bootstrap"

const EmptyQuery=()=> {

  return (
      <Card className="lastRaceCard">
        <Card.Header as="h6">No Maching Races</Card.Header>
        <Card.Body>
        No races matched your query.
         </Card.Body>
      </Card>
      
    )
  
}

export default EmptyQuery
