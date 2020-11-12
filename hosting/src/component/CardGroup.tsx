import React from "react";
import { Card } from "semantic-ui-react";
import { BasicCard } from "./BasicCard";

interface CardGroupProps {
}

interface CardGroupState {
}

export class CardGroup extends React.Component<CardGroupProps, CardGroupState> {
    render() {
        return (
            <Card.Group centered>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
                <BasicCard/>
            </Card.Group>
        )
    }
}