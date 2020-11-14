import React from "react";
import { Card } from "semantic-ui-react";
import { getFirestoreDB } from "../firestore/FirestoreActions";
import { BasicCard } from "./BasicCard";
import { Card as CardClass } from "../firestore/Card";

interface CardGroupProps {
}

interface CardGroupState {
    cardItems: Array<CardClass>,
}

export class CardGroup extends React.Component<CardGroupProps, CardGroupState> {
    constructor(props: CardGroupProps) {
        super(props);
        this.state = {
            cardItems: [],
        }
    }

    getAllCards() {
        const db = getFirestoreDB();
        db.collection('cards').onSnapshot(querySnapshot => {
            this.setState({
                cardItems: querySnapshot.docs.map(doc => new CardClass(doc.data().title))
            })
        })
    }

    componentDidMount() {
        this.getAllCards();
    }

    render() {
        return (
            <Card.Group centered key='cardGroup'>
                {
                    this.state.cardItems.map(card => 
                        <BasicCard
                            key={card.title}
                            title={card.title}
                            altTags={''}
                            otherTags={''}
                            classifies={''}
                        />
                    )
                }
            </Card.Group>
        )
    }
}