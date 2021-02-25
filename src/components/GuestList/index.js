import React, { Component } from "react";
import { Container, Header, Table, Form, Button } from "semantic-ui-react";
import axios from "axios";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            guestList: [],
            password: "",
            correctPassword: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit() {
        if (this.state.password === "dcn0359") {
            this.setState({ correctPassword: true })
        }
    }

    render() {

        const { guestList, password, correctPassword } = this.state;

        return (
            <Container fluid className="container">
                <Header as="h2">{"Wedding Guest List"}</Header>
                { correctPassword ?
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
                    <Form className="form" onSubmit={ this.handleSubmit }>
                        <Form.Field>
                            <label>{"Password"}</label>
                            <input
                                placeholder="Enter password"
                                value={ password }
                                onChange={ (e) => this.handleChange(e, "password") }
                                type="password"
                            />
                        </Form.Field>
                        <Button primary type="submit">{"Submit"}</Button>
                    </Form>
                }
            </Container>
        )
    }
}

export default AttendanceForm;
