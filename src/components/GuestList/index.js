import React, { Component } from "react";
import { Container, Header, Table, Form } from "semantic-ui-react";
import axios from "axios";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            guestList: [],
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('https://sheet.best/api/sheets/58ada64d-79d4-4596-8b0a-2d6e76fcdaf3')
        .then((response) => {
            this.setState({ guestList: response.data })
        })
    }

    handleChange(e, input) {
        let value = e.currentTarget.value;

        this.setState({ [input]: value })
    }

    render() {

        const { guestList, password } = this.state;

        return (
            <Container fluid className="container">
                <Header as="h2">{"Wedding Guest List"}</Header>
                { password === "dcn0359" ?
                    <>
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
                                {guestList.map((family, index) =>
                                    <Table.Row
                                        negative={family.attending === "no"}
                                        key={ index }
                                    >
                                        <Table.Cell>{ family.name }</Table.Cell>
                                        <Table.Cell>{ family.attending }</Table.Cell>
                                        <Table.Cell>{ family.adults }</Table.Cell>
                                        <Table.Cell>{ family.children }</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>{"Total Adults"}</Table.HeaderCell>
                                    <Table.HeaderCell>{"Total Children"}</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        { guestList.reduce((acc, family) => {
                                            return acc + parseFloat(family.adults);
                                        }, 0)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        { guestList.reduce((acc, family) => {
                                            return acc + parseFloat(family.children);
                                        }, 0)}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table> 
                    </> :
                    <Form className="form">
                        <Form.Field>
                            <label>{"Password"}</label>
                            <input
                                placeholder="Enter password"
                                value={ password }
                                onChange={ (e) => this.handleChange(e, "password") }
                                type="password"
                            />
                        </Form.Field>
                    </Form>
                }
            </Container>
        )
    }
}

export default AttendanceForm;
