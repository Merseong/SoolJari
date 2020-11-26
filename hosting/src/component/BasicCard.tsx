import React from "react";
import {
    Button,
    Card,
    Grid,
    Icon,
} from "semantic-ui-react";
import { LoginStateContext } from "../context/LoginContext";
import { removeCard } from "../firestore/FirestoreActions";

interface BasicCardProps {
    id: string,
    title: string,
    altTags: string,
    otherTags: string, // 임시
    classifies: string, // 임시
    imageLink?: string,
    isStared: boolean,
    setStared: (setVal: boolean) => void,
}

interface BasicCardState {

}

export class BasicCard extends React.Component<BasicCardProps, BasicCardState> {
    defaultImageSrc: string;

    constructor(props:BasicCardProps) {
        super(props);
        this.defaultImageSrc = 'https://earthsky.org/upl/2017/02/sirius-2-19-2018-Jim-Livingston-Custer-SD-lg-e1519156718851.jpg';
    }

    /* eslint-disable jsx-a11y/anchor-is-valid  */
    render() {
        const { id, title, isStared, setStared } = this.props;

        return (
            <Card link onClick={() => console.log(title)}>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{id}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Grid>
                        <Grid.Column floated='left'>
                            <Icon name={isStared ? "star" : "star outline"} color='yellow' link/>
                        </Grid.Column>
                        <LoginStateContext.Consumer>
                            {
                                loginState => (
                                    loginState?.isAdmin ?
                                    <Grid.Column floated='right' width={3}>
                                        <Button circular size='mini' icon='minus' color='red'
                                            onClick={() => {
                                                removeCard(id);
                                            }}
                                        />
                                    </Grid.Column>
                                    :
                                    <></>
                                )
                            }
                        </LoginStateContext.Consumer>
                    </Grid>
                </Card.Content>
            </Card>
        )
    }
}
