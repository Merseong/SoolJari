import React from "react";
import { Button, Card, Icon, Menu } from "semantic-ui-react";
import { getFirestoreDB } from "../firestore/FirestoreActions";
import { BasicCard } from "./BasicCard";
import { Card as CardClass } from "../firestore/Card";
import { LoginStateContext } from "../context/LoginContext";
import { AddCardModal } from "./AddCardModal";

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
                cardItems: querySnapshot.docs.map(doc => new CardClass(doc.id, doc.data().title))
            })
        })
    }

    componentDidMount() {
        this.getAllCards();
    }

    render() {
        return (
            <>
                <Card.Group centered key='cardGroup'>
                    {
                        this.state.cardItems.map(card => 
                            <BasicCard
                                key={card.id}
                                title={card.title}
                                id={card.id}
                                altTags={''}
                                otherTags={''}
                                classifies={''}
                            />
                        )
                    }
                </Card.Group>
                <LoginStateContext.Consumer>
                    {
                        loginState => (
                            loginState?.isAdmin ? 
                            <div
                                style={{
                                    position: 'fixed',
                                    bottom: '24px',
                                    right: '24px',
                                }}
                            >
                                <AddCardModal/>
                            </div>
                            :
                            <></>
                        )
                    }
                </LoginStateContext.Consumer>
            </>
        )
    }
}