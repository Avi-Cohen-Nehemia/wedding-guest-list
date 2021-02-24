import React, { Component } from "react";
import { Button, Form, Container, Header } from "semantic-ui-react";

class AttendanceForm extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
            attending: true,
            name: "",
            adults: 0,
            children: 0,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value} )
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {

        const { attending, name, adults, children } = this.state;

        return (
            <Container fluid className="container">
                <Header as="h2">{"Wedding Guest List"}</Header>
                    <Form className="form" onSubmit={ this.handleSubmit }>
                        <Form.Field>
                            <label>{"Attending the wedding?"}</label>
                            <input placeholder="Attending the wedding?"
                            name="attending"
                            value={ attending }
                            onChange={ this.handleChange }/>
                        </Form.Field>

                        <Form.Field>
                            <label>{"Full Name"}</label>
                            <input placeholder="Enter your name" name="name" value={ name } onChange={ this.handleChange }/>
                        </Form.Field>

                        <Form.Field>
                            <label>{"Number of adults"}</label>
                            <input
                                placeholder="Enter your age"
                                name="adults"
                                value={ adults }
                                onChange={ this.handleChange }/>
                        </Form.Field>

                        <Form.Field>
                            <label>{"Number of children"}</label>
                            <input placeholder="Enter your salary"
                            name="children"
                            value={ children }
                            onChange={ this.handleChange }/>
                        </Form.Field>

                        <Button color="blue" type="submit">{"Submit"}</Button>
                    </Form>
            </Container>
        )
    }
}

export default AttendanceForm;
