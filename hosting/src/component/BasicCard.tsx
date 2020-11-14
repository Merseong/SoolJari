import React from "react";
import {
    Card,
    Icon,
} from "semantic-ui-react";

interface BasicCardProps {
    id: string,
    title: string,
    altTags: string,
    otherTags: string, // 임시
    classifies: string, // 임시
    imageLink?: string,
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
        const { id, title } = this.props;

        return (
            <Card link onClick={() => console.log(title)}>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{id}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Icon name='star' color='yellow' link/>
                </Card.Content>
            </Card>
        )
    }
}
