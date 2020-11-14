import React from "react";
import { Card } from "semantic-ui-react";
import { getFirestoreDB } from "../firestore/FirestoreActions";
import { BasicCard } from "./BasicCard";

interface CardGroupProps {
}

interface CardGroupState {
    cardItems: Array<JSX.Element>,
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
        db.collection('cards').doc('DR6oLGzTVd0Yg1dfRgqI').get()
        .then(doc => {
            const docData = doc.data();
            console.log(docData);

            if (docData) {
                this.setState((state, _) => {
                    return {
                        cardItems: state.cardItems.concat(<BasicCard
                            key={docData.title}
                            title={docData.title}
                            altTags={docData.altTags}
                            otherTags={docData.otherTags}
                            classifies={docData.classifies}
                        />),
                    }
                })
            }
        })
        .catch(e => {
            console.error(e);
        })
    }

    componentDidMount() {
        this.getAllCards();
    }

    render() {
        return (
            <Card.Group centered key='cardGroup'>
                {this.state.cardItems}
            </Card.Group>
        )
    }
}