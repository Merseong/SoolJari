import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import { BasicCard } from "./BasicCard";
import { Card as CardClass } from "../firestore/Card";
import { useLoginState } from "../context/LoginContext";
import { AddCardModal } from "./AddCardModal";
import { getFirestoreDB } from "../firestore/FirestoreActions";

interface CardGroupProps {
    cardItems: Array<CardClass>,
}

export function CardGroup({cardItems}: CardGroupProps) {
    const loginState = useLoginState();
    const [ myCardItems, setMyCardItems ] = useState<Array<CardClass>>([]);
    let [ isLoadingCards, setLoadingCards ] = useState(false);

    if (loginState.isLogin && !isLoadingCards) {
        setLoadingCards(true);
        const db = getFirestoreDB();
        db.collection('users').doc(loginState.loginData?.uid).collection('stared').get()
        .then(querySnapshot => {
            return querySnapshot.docs.map(doc => doc.data().ref);
        })
        .then(docsRefs => {
            return Promise.all(docsRefs.map(docsRef => docsRef.get()));
        })
        .then(docs => {
            setMyCardItems(docs.map(doc => new CardClass(
                doc.id,
                doc.data()?.title,
            )));
        })
    } else if (!loginState.isLogin && isLoadingCards) {
        setLoadingCards(false);
        setMyCardItems([]);
    }

    return (
        <>
            <Card.Group centered key='cardGroup'>
                {
                    myCardItems.map(card => 
                        <BasicCard
                            key={card.id}
                            title={card.title}
                            id={card.id}
                            altTags={''}
                            otherTags={''}
                            classifies={''}
                            isStared={true}
                            setStared={(setVal: boolean) => console.log(setVal)}
                        />
                    )
                }
            </Card.Group>
            {
                loginState.isAdmin ? 
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
            }
        </>
    )
}
