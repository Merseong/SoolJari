import React from "react";
import {
    Button,
    Input,
    Modal
} from "semantic-ui-react";
import { removeCard } from "../firestore/FirestoreActions";

interface RemoveCardModalProps {
}

interface RemoveCardModalState {
    [key: string]: any;
    open: boolean;
    removeId: string;
}

export class RemoveCardModal extends React.Component<RemoveCardModalProps,RemoveCardModalState> {
    constructor(props:RemoveCardModalProps) {
        super(props);
        this.state = {
            open: false,
            removeId: '',
        }
    }

    setOpen(setVal: boolean) {
        this.setState({
            open: setVal,
        })
    }

    handleChange = (e:any, { name, value }:any) => this.setState({ [name]: value });

    removalSubmit() {
        removeCard(this.state.removeId);
        this.setOpen(false);
    }

    render() {
        const { open } = this.state;
        const setOpen = this.setOpen.bind(this);

        return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button circular size='mini' icon='minus' color='red'/>}
                closeOnDimmerClick={false}
            >
                <Modal.Header>카드 삭제</Modal.Header>
                <Modal.Content>
                    <Input
                        name='removeId'
                        label='ID'
                        fluid
                        placeholder='삭제할 ID'
                        onChange={this.handleChange}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        취소
                    </Button>
                    <Button
                        content='제거'
                        labelPosition='right'
                        color='red'
                        icon='trash'
                        onClick={() => this.removalSubmit()}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
