import React from "react";
import {
    Modal,
    Button,
    Header,
    Icon
} from "semantic-ui-react";

interface AddCardModalProps {
}

interface AddCardModalState {
    open: boolean
}

export class AddCardModal extends React.Component<AddCardModalProps, AddCardModalState> {
    constructor(props: AddCardModalProps) {
        super(props);
        this.state = {
            open: false,
        }
    }
    
    setOpen(setVal: boolean) {
        this.setState({
            open: setVal,
        })
    }

    render() {
        const { open } = this.state;
        const setOpen = this.setOpen.bind(this);

        return (
            <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Icon name='plus' color='green' link/>}
            >
                <Modal.Header>카드 추가</Modal.Header>
                <Modal.Content image>
                <Modal.Description>
                    <Header>야호</Header>
                    <p>
                    되는듯
                    </p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    취소
                </Button>
                <Button
                    content="추가"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
                </Modal.Actions>
            </Modal>
        )
    }
}
