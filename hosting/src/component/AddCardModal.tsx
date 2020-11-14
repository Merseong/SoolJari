import React from "react";
import {
    Modal,
    Icon,
    Input,
    Button,
    Dropdown
} from "semantic-ui-react";
import { addCard } from "../firestore/FirestoreActions";

interface AddCardModalProps {
}

interface AddCardModalState {
    [key: string]: any;
    open: boolean;
    title: string;
    altTag: string;
    otherTag: string;
    classify: string;
}

export class AddCardModal extends React.Component<AddCardModalProps, AddCardModalState> {
    stateOptions: any;

    constructor(props: AddCardModalProps) {
        super(props);
        this.state = {
            open: false,
            title: '',
            altTag: '',
            otherTag: '',
            classify: '',
        }
        this.stateOptions = [
            {
                key: 'a',
                text: 'a',
                value: 'a',
            },
            {
                key: 'b',
                text: 'b',
                value: 'b',
            },
            {
                key: 'c',
                text: 'c',
                value: 'c',
            }
        ]
    }
    
    setOpen(setVal: boolean) {
        this.setState({
            open: setVal,
        })
    }

    handleChange = (e:any, { name, value }:any) => this.setState({ [name]: value });

    handleEnterDown(e:KeyboardEvent) {
        if (e.code === 'Enter') {
            console.log('Entered');
        }
    }

    formSubmit() {
        addCard(this.state.title);
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
                trigger={<Icon circular fitted name='plus' color='green' link/>}
                closeOnDimmerClick={false}
            >
                <Modal.Header>카드 추가</Modal.Header>
                <Modal.Content>
                        <Input
                            name='title'
                            fluid
                            label='Title'
                            placeholder='Enter title...'
                            onChange={this.handleChange}
                        />
                        <Input
                            name='altTag'
                            fluid
                            label='Alternate Names'
                            placeholder='Enter names...'
                            onKeyDown={this.handleEnterDown}
                            onChange={this.handleChange}
                        />
                        <Dropdown
                            name='otherTag'
                            fluid
                            multiple
                            search
                            selection
                            placeholder='Enter tags...'
                            options={this.stateOptions}
                            onChange={this.handleChange}
                        />
                        <Dropdown
                            name='classify'
                            fluid
                            multiple
                            search
                            selection
                            placeholder='Enter classifies...'
                            options={this.stateOptions}
                            onChange={this.handleChange}
                        />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        취소
                    </Button>
                    <Button
                        content='추가'
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {this.formSubmit()}}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
