import React from "react";
import {
    Card,
    Icon,
    Image
} from "semantic-ui-react";

interface BasicCardProps {
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
        const { title, altTags, otherTags, classifies, imageLink } = this.props;

        return (
            <Card link>
                <Image src={imageLink ? imageLink : this.defaultImageSrc} wrapped ui={false}/>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{altTags}</Card.Meta>
                    <Card.Description>{otherTags}</Card.Description>
                    <Card.Meta textAlign='right'><a href='#'>{classifies}</a></Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <a
                        href='#'
                        onClick={() => {}}
                    >
                        <Icon name='star' color='yellow'/>
                    </a>
                </Card.Content>
            </Card>
        )
    }
}
