import React, { Component } from "react";
import { Container, Header, Icon, Table } from "semantic-ui-react";
import axios from "axios";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            guestList: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('https://sheet.best/api/sheets/58ada64d-79d4-4596-8b0a-2d6e76fcdaf3')
        .then((response) => {
            console.log(response);
        })
    }

    render() {

        const { guestList } = this.state;

        return (
            <Container fluid className="container">
                <Header as="h2">{"Wedding Guest List"}</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{"Name"}</Table.HeaderCell>
                            <Table.HeaderCell>{"Attending"}</Table.HeaderCell>
                            <Table.HeaderCell>{"Adults"}</Table.HeaderCell>
                            <Table.HeaderCell>{"Children"}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>No Name Specified</Table.Cell>
                            <Table.Cell>Unknown</Table.Cell>
                            <Table.Cell negative>None</Table.Cell>
                        </Table.Row>
                        <Table.Row positive>
                            <Table.Cell>Jimmy</Table.Cell>
                            <Table.Cell>
                            <Icon name='checkmark' />
                            Approved
                            </Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Jamie</Table.Cell>
                            <Table.Cell>Unknown</Table.Cell>
                            <Table.Cell positive>
                            <Icon name='close' />
                            Requires call
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row negative>
                            <Table.Cell>Jill</Table.Cell>
                            <Table.Cell>Unknown</Table.Cell>
                            <Table.Cell>None</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        )
    }
}

export default AttendanceForm;
